import NavLink from "@/components/nav-link";
import DashboardHeader from "@/components/dashboard-header";
import client from "@/lib/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // noStore();

  // if (!cookies().get("access_token")) {
  //   console.log("No access token found");
  //   redirect('/')
  // }
  const { data, error } = await client.GET("/api/v1/users/me", {
    headers: { Authorization: `Bearer ${cookies().get("access_token")?.value}` },
    cache: "no-store",
  });
  if (error) {
    //TODO: handle error
    console.log(error);
    revalidatePath("/");
    redirect("/login");
  }
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavLink user={data} />
      <div className="flex flex-col">
        <DashboardHeader user={data} />
        {children}
      </div>
    </div>
  );
}
