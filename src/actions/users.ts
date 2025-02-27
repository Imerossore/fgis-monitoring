import { getAuthUser } from "@/lib/getAuthUser";
import { supabase } from "@/lib/supabase";

export async function getUsers() {
  const user = await getAuthUser();

  if (!user) {
    console.log("Unauthorized user");
    return null;
  }

  const { data: usersData, error } = await supabase.from("users").select(`
  *,
  profile:profile(*)
`);

  if (error) {
    console.error("Error fetching users:", error);
    return null;
  }

  return usersData;
}

export async function updateUserStatus(userId: string, status: string) {
  const { error } = await supabase
    .from("users")
    .update({ status })
    .eq("id", userId);
  if (error) throw error;

  return { success: "User status updated successfully" };
}
