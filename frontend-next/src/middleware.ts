import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { rateLimiter, RateLimitPresets, getIdentifier } from "@/lib/rate-limit";

export default withAuth(
  function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Rate limiting para rotas de autenticação
    if (pathname.startsWith("/api/auth")) {
      const identifier = getIdentifier(req.headers);
      const { limit, window } = RateLimitPresets.AUTH;
      const result = rateLimiter.check(identifier, limit, window);

      // Adicionar headers informativos
      const response = result.success
        ? NextResponse.next()
        : new NextResponse("Too Many Requests", { status: 429 });

      response.headers.set("X-RateLimit-Limit", limit.toString());
      response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
      response.headers.set("X-RateLimit-Reset", result.reset.toString());

      if (!result.success) {
        const retryAfter = Math.ceil((result.reset - Date.now()) / 1000);
        response.headers.set("Retry-After", retryAfter.toString());
        return response;
      }

      return response;
    }

    // Proteção de rotas admin
    const token = req.nextauth.token;
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute) {
      const isAdmin = token?.role === "ADMIN" || token?.role === "admin";

      if (!token || !isAdmin) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
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
  matcher: [
    "/admin/:path*",
    "/api/auth/:path*",
  ],
};
