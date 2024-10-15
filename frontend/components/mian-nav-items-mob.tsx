import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Home, Settings, LogOut, Briefcase, Users, Menu} from "lucide-react";
import {Button} from "@/components/ui/button";
import {usePathname} from "next/navigation";
import {logout} from "@/app/login/actions";

function MainNavItemsMob() {
  const pathname = usePathname();
  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link
        href="https://euclideanai.com"
        className="flex items-center gap-2 text-lg font-semibold"
      >
        <Image
          src="/euclideanai-favicon-black-transparent.png"
          alt="EuclideanAI"
          width={35}
          height={35}
        />

        <span className="sr-only">EuclideanAI</span>
      </Link>
      <Link
        href="/dashboard"
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
          pathname === "/dashboard" ? "bg-muted" : ""
        }`}
      >
        <Home className="h-5 w-5" />
        Dashboard
      </Link>
      <Link
        href="/items"
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
          pathname === "/items" ? "bg-muted" : ""
        }`}
      >
        <Briefcase className="h-5 w-5" />
        Items
      </Link>
      <Link
        href="/chat"
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
          pathname === "/settings" ? "bg-muted" : ""
        }`}
      >
        <Settings className="h-5 w-5" />
        Chat
      </Link>
      <Link
        href="/settings"
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
          pathname === "/settings" ? "bg-muted" : ""
        }`}
      >
        <Settings className="h-5 w-5" />
        User Settings
      </Link>
      <Link
        href="/admin"
        className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
          pathname === "/admin" ? "bg-muted" : ""
        }`}
      >
        <Users className="h-5 w-5" />
        Admin
      </Link>
      <form action={logout}>
        <Button
          variant="ghost"
          type="submit"
          className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground text-red-600 text-base"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </form>
    </nav>
  );
}

export default MainNavItemsMob;
