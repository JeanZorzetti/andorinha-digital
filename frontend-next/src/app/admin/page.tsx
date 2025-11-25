import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/signin");
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p>Welcome, {session.user?.name}!</p>
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
                Authentication is working correctly.
            </div>
        </div>
    );
}
