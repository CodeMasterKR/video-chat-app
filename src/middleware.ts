import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/register"];
const AUTH_ROUTES = ["/chat", "/contacts", "/settings", "/calls"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // token yo'q va protected route — login ga
  if (!token && isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // token bor va public route — chat ga
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|mockServiceWorker.js).*)",
  ],
};