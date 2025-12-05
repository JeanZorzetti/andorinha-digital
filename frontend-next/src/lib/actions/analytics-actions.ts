"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { endOfDay, startOfDay, subDays, subMonths } from "date-fns";

export async function getAnalyticsSummary(days = 30) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const startDate = startOfDay(subDays(new Date(), days));
    const endDate = endOfDay(new Date());

    const [totalPageViews, uniqueVisitors, conversions, topPages] = await Promise.all([
      prisma.pageView.count({
        where: { createdAt: { gte: startDate, lte: endDate } },
      }),
      prisma.pageView.groupBy({
        by: ["ipAddress"],
        where: { createdAt: { gte: startDate, lte: endDate } },
        _count: true,
      }),
      prisma.conversion.count({
        where: { createdAt: { gte: startDate, lte: endDate } },
      }),
      prisma.pageView.groupBy({
        by: ["path"],
        where: { createdAt: { gte: startDate, lte: endDate } },
        _count: true,
        orderBy: { _count: { path: "desc" } },
        take: 10,
      }),
    ]);

    return {
      success: true,
      data: {
        totalPageViews,
        uniqueVisitors: uniqueVisitors.length,
        conversions,
        topPages: topPages.map((p) => ({ path: p.path, views: p._count })),
      },
    };
  } catch (error) {
    return { success: false, error: "Erro ao buscar analytics" };
  }
}

export async function getTrafficByDay(days = 30) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const startDate = startOfDay(subDays(new Date(), days));
    
    const views = await prisma.pageView.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true },
    });

    const groupedByDay = views.reduce((acc: Record<string, number>, view) => {
      const day = startOfDay(view.createdAt).toISOString();
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {});

    const data = Object.entries(groupedByDay).map(([date, count]) => ({
      date,
      views: count,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Erro ao buscar tráfego" };
  }
}

export async function getDeviceStats(days = 30) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const startDate = startOfDay(subDays(new Date(), days));

    const devices = await prisma.pageView.groupBy({
      by: ["device"],
      where: { createdAt: { gte: startDate } },
      _count: true,
    });

    return {
      success: true,
      data: devices.map((d) => ({
        device: d.device || "Unknown",
        count: d._count,
      })),
    };
  } catch (error) {
    return { success: false, error: "Erro ao buscar estatísticas de dispositivos" };
  }
}

export async function getConversionStats(days = 30) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { success: false, error: "Não autorizado" };
    }

    const startDate = startOfDay(subDays(new Date(), days));

    const conversions = await prisma.conversion.groupBy({
      by: ["type"],
      where: { createdAt: { gte: startDate } },
      _count: true,
      _sum: { value: true },
    });

    return {
      success: true,
      data: conversions.map((c) => ({
        type: c.type,
        count: c._count,
        totalValue: c._sum.value || 0,
      })),
    };
  } catch (error) {
    return { success: false, error: "Erro ao buscar conversões" };
  }
}

export async function trackPageView(data: {
  path: string;
  referrer?: string;
  userAgent?: string;
}) {
  try {
    await prisma.pageView.create({
      data: {
        path: data.path,
        referrer: data.referrer,
        userAgent: data.userAgent,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function trackConversion(data: {
  type: string;
  page: string;
  value?: number;
  metadata?: any;
}) {
  try {
    await prisma.conversion.create({
      data: {
        type: data.type as any,
        page: data.page,
        value: data.value,
        metadata: data.metadata,
      },
    });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
