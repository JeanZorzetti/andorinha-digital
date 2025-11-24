import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // Only allow if token exists (user is logged in)
            // You can add role checks here if needed, e.g., token?.role === "admin"
            return !!token;
        },
    },
});

export const config = {
    matcher: ["/admin/:path*"],
};
