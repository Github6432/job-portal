import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Secret key for JWT verification
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Role-based route definitions
const roleRoutes: Record<string, string[]> = {
  "/admin": ["admin"],
  "/dashboard": ["user", "admin"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    return redirectTo(req, "/login");
  }

  try {
    // Decode the token and get the user's role
    const { role } = jwt.verify(token, SECRET_KEY) as { role: string };

    // Find the allowed roles for the current route
    const allowedRoles = Object.entries(roleRoutes).find(([route]) =>
      req.nextUrl.pathname.startsWith(route)
    )?.[1];
    console.log(allowedRoles, role)

    // If the route has no role restrictions or the user's role matches, allow access
    if (!allowedRoles || allowedRoles.includes(role)) {
      return NextResponse.next();
    }

    // If role mismatch, redirect to unauthorized page
    return redirectTo(req, "/unauthorized");
  } catch {
    // If token is invalid, redirect to login
    return redirectTo(req, "/login");
  }
}

// Helper function to handle redirections
function redirectTo(req: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, req.url));
}

// Middleware will apply to these routes
export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
