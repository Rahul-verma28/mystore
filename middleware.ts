import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const protectedPaths = ["/wishlist", "/cart", "/profile"];
  const authPaths = ["/login", "/signup"];

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  const isAuthPage = authPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // If accessing a protected route and not authenticated, redirect to home
  if (isProtected && !token) {
    toast("Please login to view this page");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  // If accessing login/signup and already authenticated, redirect to profile or home
  if (isAuthPage && token) {
    toast("Please login to view this page");
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to profile
  }

  // Continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ["/wishlist/:path*", "/cart/:path*", "/profile/:path*", "/login", "/signup"],
};

