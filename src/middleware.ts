import { NextRequest, NextResponse } from "next/server";
import { getAuthUser, getProfile } from "./lib/getAuthUser";

const ProtectedRoutes = ["/dashboard", "/setting"];

const SetupRoutes = ["/setup-profile"];

const VerificationRoutes = ["/verification"];

const PublicRoutes = ["/login", "/register", "/"];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = ProtectedRoutes.includes(path);
  const isSetup = SetupRoutes.includes(path);
  const isVerification = VerificationRoutes.includes(path);
  const isPublic = PublicRoutes.includes(path);

  const user = await getAuthUser();
  const profile = await getProfile();
  const userId = user?.id;
  const status = user?.status;

  if ((isProtected || isSetup || isVerification) && !userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isSetup && profile) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isVerification && !profile) {
    return NextResponse.redirect(new URL("/setup-profile", req.nextUrl));
  }

  if (isVerification && status !== "pending") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isProtected && !profile) {
    return NextResponse.redirect(new URL("/setup-profile", req.nextUrl));
  }

  if (isProtected && status === "pending") {
    return NextResponse.redirect(new URL("/verification", req.nextUrl));
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
