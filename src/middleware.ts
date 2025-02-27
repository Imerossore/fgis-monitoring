import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "./lib/getAuthUser";

const ProtectedRoutes = ["/dashboard", "/setting"];
const PublicRoutes = ["/login", "/register", "/"];
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = ProtectedRoutes.includes(path);
  const isPublic = PublicRoutes.includes(path);

  const user = await getAuthUser();
  const userId = user?.userId;

  if (isProtected && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  if (isPublic && userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  if (path === "/" && isPublic) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
