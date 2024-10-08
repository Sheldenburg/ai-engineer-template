"use client";
import Link from "next/link";
import {
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import MainNavItems from "./main-nav-items";
import ChatHistory from "./chat-history";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

function NavLink({ user }: { user: { email: string, chatList?: any } }) {
  const pathname = usePathname();
  const [ showSecondNav, setShowSecondNav ] = useState(false);
  const handleToggleSwitch = () => {
    setShowSecondNav((prev: boolean) => !prev);
    console.log(showSecondNav);
    console.log(pathname);
  };

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
          {!showSecondNav? <MainNavItems /> : <ChatHistory chatList={user.chatList}/>}
        </div>
        <div className="fixed bottom-3 mt-auto pb-10 pl-8 items-center justify-center text-start">
          <div className="flex gap-3 mb-3 items-center justify-center">
            <Switch onClick={handleToggleSwitch}/>
            <p className="text-sm">Show Chat History</p>
          </div>
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
