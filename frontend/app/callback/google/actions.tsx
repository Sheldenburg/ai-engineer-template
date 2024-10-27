"use server";
import initiateClient from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function getAccessTokenGoogleAuth(code: string) {
  const client = initiateClient();
  const { data, error } = await client.POST("/api/v1/auth/google", {
    body: {
      code: code,
    } as { code: string },
    cache: "no-store",
  });
  if (error) {
    console.log(error);
    // redirect("/login");
  }
  if (data) {
    cookies().set("access_token", data.access_token);
    // revalidatePath("/", "layout");
    redirect("/dashboard");
  }
}
