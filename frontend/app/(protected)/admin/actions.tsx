"use server";
import initiateClient from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function addUsers(additionalInfo: string, formData: FormData) {
  const client = initiateClient();
  const isSuperUser = JSON.parse(additionalInfo).isSuperUser;
  const isActive = JSON.parse(additionalInfo).isActive;
  console.log(additionalInfo, isSuperUser, isActive);
  const { data, error } = await client.POST("/api/v1/users/", {
    body: {
      email: formData.get("email") as string,
      is_active: isActive as boolean,
      is_superuser: isSuperUser as boolean,
      full_name: formData.get("fullName") as string,
      password: formData.get("password") as string,
    },
  });
  if (error) {
    console.error(error);
    return { error: error.detail };
  }
  revalidatePath("/admin");
}

export async function editUser(additionalInfo: string, formData: FormData) {
    const client = initiateClient();
    const userId = JSON.parse(additionalInfo).userId;
    const isSuperUser = JSON.parse(additionalInfo).isSuperUser;
    const isActive = JSON.parse(additionalInfo).isActive;
    const { data, error } = await client.PATCH("/api/v1/users/{user_id}", {
        body: {
        email: formData.get("email") as string,
        is_active: isActive,
        is_superuser: isSuperUser,
        full_name: formData.get("fullName") as string,
        password: formData.get("password") as string,
        },
        params: { path: { user_id: Number(userId) } },
    });
    if (error) {
        console.error(error);
        return { error: error.detail };
    }
    revalidatePath("/admin");
}

export async function deleteUser(userId: string) {
  const client = initiateClient();
  const { data, error } = await client.DELETE("/api/v1/users/{user_id}", {
    params: { path: { user_id: Number(userId) } },
  });
  if (error) {
    console.log(error);
    return { error: error.detail };
  }
  revalidatePath("/admin");
}

