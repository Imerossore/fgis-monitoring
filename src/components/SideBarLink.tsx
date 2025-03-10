"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type SideBarLinkProps = {
  label: string;
  href: string;
  icon: ReactNode;
};

export default function SideBarLink({ label, href, icon }: SideBarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return (
    <li className="list-none">
      <Link
        href={href}
        className={`flex items-center gap-2 p-1  rounded-md ${
          isActive
            ? "bg-primary text-white "
            : "bg-white hover:bg-slate-200 duration-300 "
        }`}
      >
        <span
          className={`p-2 rounded-lg text-2xl ${
            isActive ? "text-white text-primary" : "bg-primary text-white"
          }`}
        >
          {icon}
        </span>
        <span>{label}</span>
      </Link>
    </li>
  );
}
