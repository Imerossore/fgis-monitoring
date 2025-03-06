"use server";
import { ActionState, UserType, getAuthUser } from "@/lib/getAuthUser";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function getVerifiedUsers(): Promise<UserType[]> {
  try {
    const user = await getAuthUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("users")
      .select("*, profile(*)")
      .eq("status", "approved")
      .neq("id", user?.id);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching verified users:", error);
    return [];
  }
}

export async function getPendingUsers(): Promise<UserType[]> {
  try {
    const user = await getAuthUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from("users")
      .select("*, profile(*)")
      .eq("status", "pending")
      .neq("id", user?.id);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching verified users:", error);
    return [];
  }
}

export async function updateUserStatus(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const user = await getAuthUser();
    if (!user)
      return {
        success: false,
        message: "User not authenticated",
      };

    const id = formData.get("id") as string;
    const status = formData.get("status") as string;

    const { error } = await supabase
      .from("users")
      .update({ status })
      .eq("id", id);

    if (error) throw error;

    revalidatePath("/");
    return {
      success: true,
      message: "User status updated successfully",
    };
  } catch (error) {
    console.error("Error updating user status:", error);
    return {
      success: false,
      message: "Failed to update user status",
    };
  }
}

export async function setUserRoleDivision(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const user = await getAuthUser();
    if (!user) {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const id = formData.get("id") as string;
    const role = formData.get("role") as string;
    const division = formData.get("division") as string;

    const { error } = await supabase
      .from("profile")
      .update({ role, division })
      .eq("user_id", id);

    if (error) throw error;

    revalidatePath("/");
    return {
      success: true,
      message: "User role and division updated successfully",
    };
  } catch (error) {
    console.error("Error updating user role and division:", error);
    return {
      success: false,
      message: "Failed to update user role and division",
    };
  }
}
