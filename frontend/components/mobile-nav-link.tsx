"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, Settings, LogOut, Briefcase, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { revalidatePath } from "next/cache";
import { logout } from "@/app/login/actions";
import { useState } from "react";
import MainNavItemsMob from "./mian-nav-items-mob";
import { Switch } from "@/components/ui/switch";
import ChatHistory from "./chat-history";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

function MobileNavLink({ user }: { user: { email: string; chatList?: any } }) {
  const pathname = usePathname();
  const [showSecondNav, setShowSecondNav] = useState(false);
  const handleToggleSwitch = () => {
    setShowSecondNav((prev: boolean) => !prev);
    console.log(showSecondNav);
    console.log(pathname);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-1">
        {!showSecondNav ? (
          <MainNavItemsMob />
        ) : (
          <ChatHistory chatList={user.chatList} />
        )}
        <div className="mt-auto p-2 ml-3">
          <div className="flex gap-3 mb-3 items-center justify-start">
            <Switch onClick={handleToggleSwitch} />
            <p className="text-sm">Show Chat History</p>
          </div>
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
