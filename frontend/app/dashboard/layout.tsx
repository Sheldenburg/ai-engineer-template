import NavLink from "@/components/nav-link";
import DashboardHeader from "@/components/dashboard-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <NavLink />
      <div className="flex flex-col">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
