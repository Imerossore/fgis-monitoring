"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { ActionState, UserType } from "@/lib/getAuthUser";
import { useActionState } from "react";
import { updateUserStatus } from "@/actions/users";
import { Check, Loader2, X } from "lucide-react";

interface UserActionDialogProps {
  user: UserType;
  action: "approve" | "decline";
}

export function PendingUserActionDialog({
  user,
  action,
}: UserActionDialogProps) {
  const isApprove = action === "approve";

  const initialState: ActionState = {
    success: false,
    message: "",
  };

  const [state, statusAction, isPending] = useActionState(
    updateUserStatus,
    initialState
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className="w-full flex items-center gap-1"
          variant={isApprove ? "default" : "destructive"}
        >
          {isApprove ? (
            <Check className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
          {isApprove ? "Approve" : "Decline"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isApprove ? "Approve" : "Decline"} User
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            Are you sure you want to {action} {user.profile?.first_name}{" "}
            {user.profile?.last_name}?
            {!isApprove && " This action cannot be undone."}
            {state.message && (
              <div className="text-sm text-muted-foreground">
                {state.message}
              </div>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <form action={statusAction}>
            <input type="hidden" name="id" value={user.id} />
            <input
              type="hidden"
              name="status"
              value={action === "approve" ? "approved" : "declined"}
            />
            <AlertDialogAction
              type="submit"
              className={
                !isApprove ? "bg-destructive hover:bg-destructive/90" : ""
              }
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isApprove ? "Approving..." : "Declining..."}
                </>
              ) : isApprove ? (
                "Approve"
              ) : (
                "Decline"
              )}
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
