"use server";
import initiateClient from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addChatConfig(formData: FormData) {
  const client = initiateClient();
  const { data, error } = await client.POST("/api/v1/chat/config", {
    body: {
      model: formData.get("model") as string,
      api_key: formData.get("api-key") as string,
      temperature: Number(formData.get("temperature")),
      top_p: Number(formData.get("top-p")),
      // topK: Number(formData.get("topK")),
      system_message: formData.get("system-message") as string,
    },
  });
  if (error) {
    console.log(error);
    redirect(`/chat?message=${error.detail}`);
  }
  revalidatePath("/chat");
  redirect("/chat");
}

export async function editChatConfig(formData: FormData) {
  const client = initiateClient();
  const { data, error } = await client.PUT("/api/v1/chat/config", {
    body: {
      model: formData.get("model") as string,
      api_key: formData.get("api-key") as string,
      temperature: Number(formData.get("temperature")),
      top_p: Number(formData.get("top-p")),
      // topK: Number(formData.get("topK")),
      system_message: formData.get("system-message") as string,
    },
  });
  if (error) {
    console.log(error);
    redirect(`/chat?message=${error.detail}`);
  }
  revalidatePath("/chat");
  redirect("/chat");
}
