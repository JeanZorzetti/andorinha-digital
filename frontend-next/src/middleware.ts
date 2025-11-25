import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Proteger rotas /admin - apenas usuários com role ADMIN
    // Aceita tanto string "admin" (sessões antigas) quanto enum "ADMIN"
    const isAdmin = token?.role === "ADMIN" || token?.role === "admin";

    if (isAdminRoute && (!token || !isAdmin)) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
