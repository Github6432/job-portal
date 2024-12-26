import { JWTPayload, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fetchUserRole } from "./utils/fetchUserRole";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  try {
    const { payload }: { payload: JWTPayload } = await jwtVerify(token, secretKey);

    const userId = payload?.id;
    if (!userId) {
      return NextResponse.redirect(new URL("/user/login", req.url));
    }

    const userRole = await fetchUserRole(userId, token);

    if (!userRole) {
      return NextResponse.redirect(new URL("/user/login", req.url));
    }

    const path = req.nextUrl.pathname;
    if (
      (userRole === "admin" && path.startsWith("/admin")) 
    ) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL(
        userRole === "admin" ? "/admin/Dashboard" : "/user/Dashboard",
        req.url
      )
    );
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/user/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
