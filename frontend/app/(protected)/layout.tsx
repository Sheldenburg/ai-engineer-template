import NavLink from "@/components/nav-link";
import DashboardHeader from "@/components/dashboard-header";
import client from "@/lib/api";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = await client.GET("/api/v1/users/me", {
    cache: "no-store",
  });
  if (error) {
    //TODO: handle error
    console.log(error);
    redirect("/");
  } 
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavLink user={data} />
      <div className="flex flex-col w-screen">
        <DashboardHeader user={data}/>
        {children}
      </div>
    </div>
  );
}
