import { cookies } from "next/headers";
import { decrypt } from "./session";
import { supabase } from "./supabase";

export async function getAuthUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  const user = await decrypt(session);
  return user;
}

export async function getProfile() {
  const authUser = await getAuthUser();

  if (!authUser) {
    return null;
  }

  const { data: user } = await supabase
    .from("profile")
    .select("*")
    .eq("id", authUser.userId)
    .single();

  // if (error) {
  //   console.error("Error fetching profile:", error);
  //   return null;
  // }

  return user;
}
