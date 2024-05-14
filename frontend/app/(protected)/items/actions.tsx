"use server";
import initiateClient from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addItems(formData: FormData) {
  const client = initiateClient();
  const { data, error } = await client.POST("/api/v1/items/", {
    body: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    },
  });
  if (error) {
    console.log(error);
    redirect(`/items?message=${error.detail}`);
  }
  revalidatePath("/items");
  redirect("/items");
}

export async function deleteItem(itemId: string) {
  const client = initiateClient();
  const { data, error } = await client.DELETE("/api/v1/items/{id}", {
    params: { path: { id: Number(itemId) } },
  });
  if (error) {
    console.log(error);
    redirect(`/items?message=${error.detail}`);
  }
  revalidatePath("/items");
  redirect("/items");
}

export async function editItem(itemId: string, formData: FormData) {
  const client = initiateClient();
  const { data, error } = await client.PUT("/api/v1/items/{id}", {
    body: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    },
    params: { path: { id: Number(itemId) } },
  });
  if (error) {
    console.log(error);
    redirect(`/items?message=${error.detail}`);
  }
  revalidatePath("/items");
  redirect("/items");
}
