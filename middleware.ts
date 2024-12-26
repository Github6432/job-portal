import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { JWTPayload, jwtVerify } from "jose";
import { fetchUserRole } from "./utils/fetchUserRole"; // Helper function for role fetching

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // If no token is found, respond with 401
  if (!token) {
    return NextResponse.redirect(new URL("/user/login", req.url)); // Redirect to login
  }

  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload }: { payload: JWTPayload } = await jwtVerify(token, secretKey);

    const userId = payload?.id;
    if (!userId) {
      return NextResponse.redirect(new URL("/user/login", req.url)); // Redirect to login
    }

    // Fetch the user's role
    const userRole = await fetchUserRole(userId, token);
    console.log("USER ROLE:", userRole);

    const path = req.nextUrl.pathname;

    // Redirect users based on role
    if (userRole === "admin" && path.startsWith("/admin")) {
      return NextResponse.next(); // Allow admin to access admin routes
    } else if (userRole === "user" && path.startsWith("/user")) {
      return NextResponse.next(); // Allow user to access user routes
    } else if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin/Dashboard", req.url)); // Redirect admin to their dashboard
    } else if (userRole === "user") {
      return NextResponse.redirect(new URL("/user/Dashboard", req.url)); // Redirect user to their dashboard
    }

    // Default response: Redirect unauthorized roles to login
    return NextResponse.redirect(new URL("/user/login", req.url));
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/user/login", req.url)); // Redirect on error
  }
}

export const config = {
  matcher: [
    "/admin/:path*", // Matches anything under /admin
    "/user/:path*", // Matches anything under /user
    "/dashboard", // Matches root dashboard
  ],
};
