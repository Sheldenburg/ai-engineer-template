"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, Settings, LogOut, Briefcase, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

function MobileNavLink({ user }: { user: { email: string } }) {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
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
          <Link
            href="/"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </nav>
        <div className="mt-auto">
          <p className="text-sm">logged in as:</p>
          <p className="text-sm">{user.email}</p>
          {/* <Card>
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavLink;
