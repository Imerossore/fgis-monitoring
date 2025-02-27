"use server";

import { getAuthUser } from "@/lib/getAuthUser";
import { supabase } from "@/lib/supabase";

async function uploadToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dfycblxoj/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}

export async function uploadProfile(prevState: unknown, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const imageFile = formData.get("image") as File;

    if (!firstName || !lastName) {
      return {
        success: false,
        message: "First name and last name are required",
      };
    }

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadToCloudinary(imageFile);
    }
    const user = await getAuthUser();
    const userId = user?.userId;

    const { error } = await supabase.from("profile").insert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      email_address: email || null,
      avatar_url: imageUrl,
    });

    if (error) throw error;

    return {
      success: true,
      message: "Profile uploaded successfully",
    };
  } catch (error) {
    console.error("Error in uploadProfile:", error);
    return {
      success: false,
      message: "Failed to upload profile",
    };
  }
}
