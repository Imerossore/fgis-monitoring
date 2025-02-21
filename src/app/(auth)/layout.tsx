"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Logo from "@/components/Logo";
import Slideshow from "@/components/SlideShow";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const goto = () => {
    return pathname.startsWith("/login") ? (
      <p>
        New here?{" "}
        <Link href="/register" className="text-primary font-semibold">
          Create an account
        </Link>{" "}
        to get started.
      </p>
    ) : (
      <p>
        Existing user?{" "}
        <Link href="/login" className="text-primary font-semibold">
          Sign in
        </Link>{" "}
        here.
      </p>
    );
  };

  return (
    <div className="flex items-center flex-col h-full ">
      <div className="absolute top-10 left-10 right-10 h-[65vh] overflow-hidden rounded-2xl ">
        <Slideshow />
      </div>
      <div className="absolute top-10 left-10 right-10 h-[65vh] overflow-hidden rounded-2xl bg-white/25 " />
      <h1 className="absolute top-16 text-center  text-primary  glassmorphic p-2  overflow-hidden text-4xl font-semibold ">
        NIA-UPRIIS FGIS MONITORING SYSTEM
      </h1>
      <Card className="z-[1] w-[22rem] absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 py-3">
        <CardHeader className="flex items-center justify-center py-3">
          <Logo height={110} />
        </CardHeader>
        <CardContent className="py-2">{children}</CardContent>
        <CardFooter className="flex items-center justify-center text-xs pb-4 ">
          {goto()}
        </CardFooter>
      </Card>
    </div>
  );
}
