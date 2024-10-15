import React from "react";
import Link from "next/link";
import {Home, Settings, BotMessageSquare, Briefcase, Users, ShoppingBag} from "lucide-react";
import {usePathname} from "next/navigation";

function MainNavItems() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-3">
      <Link
        href="/dashboard"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${
          pathname === "/dashboard" ? "bg-muted" : ""
        }`}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      {/* <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link> */}
      <Link
        href="/items"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${
          pathname === "/items" ? "bg-muted" : ""
        }`}
      >
        <Briefcase className="h-4 w-4" />
        Items{" "}
      </Link>
      <Link
        href="/chat"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${
          pathname === "/chat" ? "bg-muted" : ""
        }`}
      >
        <BotMessageSquare className="h-4 w-4" />
        Chat{" "}
      </Link>
      <Link
        href="/shop"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${
          pathname === "/shop" ? "bg-muted" : ""
        }`}
      >
        <ShoppingBag className="h-4 w-4" />
        Shop{" "}
      </Link>
      <Link
        href="/settings"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${
          pathname === "/settings" ? "bg-muted" : ""
        }`}
      >
        <Settings className="h-4 w-4" />
        User Settings
      </Link>
      <Link
        href="/admin"
        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary ${
          pathname === "/admin" ? "bg-muted" : ""
        }`}
      >
        <Users className="h-4 w-4" />
        Admin
      </Link>
    </nav>
  );
}

export default MainNavItems;
