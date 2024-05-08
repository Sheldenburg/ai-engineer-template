"use server";
import client from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const { error } = await client.PATCH("/api/v1/users/me", {
    body: {
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
    },
  });
  if (error) {
    console.error(error);
    redirect(`/settings/?message=${error.detail}`);
  }
  revalidatePath("/settings");
}

export async function updatePassword(formData: FormData) {
  const { data, error } = await client.PATCH("/api/v1/users/me/password", {
    body: {
      current_password: formData.get("currentPassword") as string,
      new_password: formData.get("newPassword") as string,
    },
  });
  if (error) {
    console.error(error);
    return {error: error.detail}
  }
  revalidatePath("/settings");
}
