"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { ActionState, UserType } from "@/lib/getAuthUser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Edit } from "lucide-react";
import { setUserRoleDivision } from "@/actions/users";

interface SelectRoleDivisionDialog {
  user: UserType;
}

const divisions = [
  { value: "division-1", label: "Division 1" },
  { value: "division-2", label: "Division 2" },
  { value: "division-3", label: "Division 3" },
  { value: "division-4", label: "Division 4" },
  { value: "division-5", label: "Division 5" },
  { value: "division-6", label: "Division 6" },
  { value: "drd", label: "DRD" },
] as const;

export default function SelectRoleDivisionDialog({
  user,
}: SelectRoleDivisionDialog) {
  const [selectedRole, setSelectedRole] = useState<string>(
    user.profile?.role || ""
  );
  const [selectedDivision, setSelectedDivision] = useState<string>(
    user.profile?.division || ""
  );

  const initialState: ActionState = {
    success: false,
    message: "",
  };

  const [state, action, isPending] = useActionState(
    setUserRoleDivision,
    initialState
  );

  const getInitials = (name: string = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "administrator":
        return "default";
      case "editor":
        return "secondary";
      case "viewer":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 hover:bg-accent hover:text-accent-foreground"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <input type="hidden" name="id" value={user.id} />
          <input type="hidden" name="role" value={selectedRole} />
          <input type="hidden" name="division" value={selectedDivision} />

          <DialogHeader className="space-y-4">
            <DialogTitle className="text-xl">
              Role & Division Management
            </DialogTitle>
            <DialogDescription />

            <div className="flex items-start space-x-4 pb-2 border-b">
              <Avatar className="h-12 w-12 border-2 border-muted">
                <AvatarImage src={user.profile?.avatar_url} />
                <AvatarFallback className="bg-primary/10 font-medium">
                  {getInitials(
                    `${user.profile?.first_name} ${user.profile?.last_name}`
                  )}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium text-lg">
                  {user.profile?.first_name} {user.profile?.last_name}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{user.id_number}</span>
                  {user.profile?.role && (
                    <Badge
                      variant={getRoleBadgeVariant(user.profile.role)}
                      className="capitalize"
                    >
                      {user.profile.role}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role Assignment</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRole === "editor" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Division Assignment
                </label>
                <Select
                  value={selectedDivision}
                  onValueChange={setSelectedDivision}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a division" />
                  </SelectTrigger>
                  <SelectContent>
                    {divisions.map((division) => (
                      <SelectItem key={division.value} value={division.value}>
                        {division.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <DialogFooter className="flex items-center justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
