"use client";

import { getAvatarColor, getInitials } from "@/lib/bg-color-profile";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Edit, Check, X } from "lucide-react";
import { useState } from "react";
import { UserType } from "@/lib/getAuthUser";
import { PendingUserActionDialog } from "./PendingUserActionDialog";
import SelectRoleDivisionDialog from "./SelectRoleDivisionDialog";

export default function UserCard({ user }: { user: UserType }) {
  const initials = getInitials(
    user.profile?.first_name ?? "",
    user.profile?.last_name ?? ""
  );
  const [isHovered, setIsHovered] = useState(false);

  const isVerified = user.status === "approved";

  return (
    <div
      className="bg-card shadow-lg rounded-2xl p-3 flex items-center gap-5 relative hover:scale-[1.02] duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isVerified && isHovered && <SelectRoleDivisionDialog user={user} />}
      <Avatar className="h-24 w-24">
        <AvatarImage src={user.profile?.avatar_url} className="object-cover" />
        <AvatarFallback
          style={{
            backgroundColor: initials ? getAvatarColor(initials) : "white",
          }}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-semibold">{`${user.profile?.first_name} ${user.profile?.last_name}`}</h1>
        <p className="text-xs text-muted-foreground mb-2">{user.id_number}</p>

        {isVerified ? (
          <p className="text-sm text-primary border border-primary rounded-full p-.5 text-center">
            {user.profile?.role || "Assign Role"}
          </p>
        ) : (
          <div className="flex gap-2">
            <PendingUserActionDialog user={user} action="approve" />
            <PendingUserActionDialog user={user} action="decline" />
          </div>
        )}
      </div>
    </div>
  );
}
