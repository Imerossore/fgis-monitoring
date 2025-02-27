"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import { LogoutAlertDialog } from "./LogoutAlertDialog";
import { IoMdArrowDropdown } from "react-icons/io";
import { cn } from "@/lib/utils";

interface MenuOptionProps {
  variant: "more" | "dropdown";
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  iconClassName?: string;
  menuItemClassName?: string;
}

export default function MenuOption({
  variant = "more",
  className,
  buttonClassName,
  dropdownClassName,
  iconClassName,
  menuItemClassName,
}: MenuOptionProps) {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
  };

  const navigateToSettings = () => {
    router.push("/setting");
  };

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className={cn(
              "relative rounded-full focus-visible:ring-0 bg-transparent shadow-none",
              buttonClassName
            )}
          >
            {variant === "more" ? (
              <MoreVertical className={cn("h-6 w-6", iconClassName)} />
            ) : (
              <IoMdArrowDropdown className={cn("h-8 w-8", iconClassName)} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn("w-52", dropdownClassName)}
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            className={cn("cursor-pointer", menuItemClassName)}
            onClick={navigateToSettings}
          >
            <Settings className="mr-2 h-4 w-4" />
            My Profile
          </DropdownMenuItem>

          <DropdownMenuItem
            className={cn("text-red-600 cursor-pointer", menuItemClassName)}
            onClick={() => setIsAlertOpen(true)}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutAlertDialog
        isOpen={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        onConfirm={handleLogout}
      />
    </div>
  );
}
