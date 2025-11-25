import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        const adminUser = await prisma.user.findUnique({
            where: { email: 'admin@andorinha.com' },
            select: { id: true, email: true, role: true, createdAt: true } // Do not select password
        });

        return NextResponse.json({
            userCount,
            adminExists: !!adminUser,
            adminUser,
            dbUrl: process.env.DATABASE_URL ? 'Defined (starts with ' + process.env.DATABASE_URL.substring(0, 10) + '...)' : 'Undefined'
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
