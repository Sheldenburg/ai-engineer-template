"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import client from "@/lib/api";

export async function login(formData: FormData) {
  const { data, error } = await client.POST("/api/v1/login/access-token", {
    body: {
      grant_type: "",
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      scope: "",
      client_id: "",
      client_secret: "",
    },
    bodySerializer(body: any) {
      const fd = new FormData();
      for (const name in body) {
        fd.append(name, body[name]);
      }
      return fd;
    },
  });
  if (error) {
    console.log(error);
    redirect(
      `/login?message=${error.detail}`
    );
  }
  cookies().set("access_token", data.access_token);
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const { data, error } = await client.POST("/api/v1/users/signup", {
    body: {
      email: formData.get("username") as string,
      password: formData.get("password") as string,
    },
  });
  if (error) {
    console.log(error);
    redirect(`/login?message=${error.detail}`);
  }
  revalidatePath("/", "layout");
  redirect("/login?message=Check your email to continue sign in process");
}
