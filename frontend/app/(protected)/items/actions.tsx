"use server";
import client from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function addItems(formData: FormData) {
  const { data, error } = await client.POST("/api/v1/items/", {
    body: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    },
    headers: {
      Authorization: `Bearer ${cookies().get("access_token")?.value}`,
    },
  });
  if (error) {
    console.log(error);
    redirect(`/items?message=${error.detail}`);
  }
  revalidatePath("/items");
  redirect("/items");
}
