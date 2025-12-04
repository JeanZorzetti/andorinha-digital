"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

/**
 * Create an audit log entry
 */
export async function createAuditLog({
  action,
  resource,
  resourceId,
  details,
}: {
  action: "CREATE" | "UPDATE" | "DELETE" | "LOGIN" | "LOGOUT" | "PASSWORD_CHANGE" | "ROLE_CHANGE" | "PUBLISH" | "UNPUBLISH";
  resource: "USER" | "POST" | "CASE" | "SERVICE" | "MEDIA" | "SETTINGS";
  resourceId?: string;
  details?: string;
}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return { success: false, error: "Not authenticated" };
    }

    // Get request headers for IP and User-Agent
    const headersList = await headers();
    const ipAddress = headersList.get("x-forwarded-for") ||
                     headersList.get("x-real-ip") ||
                     "unknown";
    const userAgent = headersList.get("user-agent") || "unknown";

    const log = await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action,
        resource,
        resourceId,
        details,
        ipAddress,
        userAgent,
      },
    });

    return { success: true, log };
  } catch (error: unknown) {
    console.error("Error creating audit log:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create audit log"
    };
  }
}

/**
 * List audit logs with filters and pagination
 */
export async function listAuditLogs({
  page = 1,
  limit = 50,
  action,
  resource,
  userId,
  search,
}: {
  page?: number;
  limit?: number;
  action?: string;
  resource?: string;
  userId?: string;
  search?: string;
} = {}) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      ...(action && { action }),
      ...(resource && { resource }),
      ...(userId && { userId }),
      ...(search && {
        OR: [
          { details: { contains: search, mode: "insensitive" } },
          { resourceId: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              image: true,
              role: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return {
      success: true,
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error: unknown) {
    console.error("Error listing audit logs:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to list audit logs"
    };
  }
}

/**
 * Get audit log statistics
 */
export async function getAuditStats() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const [
      totalLogs,
      todayLogs,
      actionCounts,
      resourceCounts,
    ] = await Promise.all([
      prisma.auditLog.count(),
      prisma.auditLog.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.auditLog.groupBy({
        by: ["action"],
        _count: true,
        orderBy: {
          _count: {
            action: "desc",
          },
        },
        take: 5,
      }),
      prisma.auditLog.groupBy({
        by: ["resource"],
        _count: true,
        orderBy: {
          _count: {
            resource: "desc",
          },
        },
        take: 5,
      }),
    ]);

    return {
      success: true,
      stats: {
        totalLogs,
        todayLogs,
        topActions: actionCounts.map(item => ({
          action: item.action,
          count: item._count,
        })),
        topResources: resourceCounts.map(item => ({
          resource: item.resource,
          count: item._count,
        })),
      },
    };
  } catch (error: unknown) {
    console.error("Error getting audit stats:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to get audit stats"
    };
  }
}

/**
 * Delete old audit logs (data retention)
 */
export async function deleteOldAuditLogs(daysToKeep: number = 90) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Unauthorized" };
    }

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const result = await prisma.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: cutoffDate,
        },
      },
    });

    // Log the deletion action
    await createAuditLog({
      action: "DELETE",
      resource: "SETTINGS",
      details: `Deleted ${result.count} audit logs older than ${daysToKeep} days`,
    });

    return { success: true, deletedCount: result.count };
  } catch (error: unknown) {
    console.error("Error deleting old audit logs:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete old audit logs"
    };
  }
}
