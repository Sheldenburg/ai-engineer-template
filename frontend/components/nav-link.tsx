"use client";
import Link from "next/link";
import { Bell, Home, Settings, BotMessageSquare, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

function NavLink({ user }: { user: { email: string } }) {
  const pathname = usePathname();
  return (
    <div className="hidden fixed top-0 left-0 w-1/6 border-r bg-muted/40 min-h-screen md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="https://euclideanai.com"
            className="flex items-center gap-2 font-semibold"
          >
            <Image
              src="/euclideanai-favicon-black-transparent.png"
              alt="EuclideanAI"
              width={35}
              height={35}
            />
            <span className="">EuclideanAI</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
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
        </div>
        <div className="fixed bottom-3 mt-auto pb-10 pl-8 items-center justify-center text-start">
          <p className="text-sm">logged in as:</p>
          <p className="text-sm">{user.email}</p>
          {/* <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}

export default NavLink;
