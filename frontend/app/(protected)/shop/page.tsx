"use client";
// import ChatSettings from "@/components/chat-settings";
// import ChatUI from "@/components/chat-ui";
// import initiateClient from "@/lib/api";
import {nanoid} from "nanoid";
import {useRouter} from "next/navigation";

export default async function ShopPage() {
  const router = useRouter();
  router.push(`/shop/${nanoid()}`);
  return (
    // todo: implement a loading spinner as it transits to the individual chat page
    <div className="flex flex-col h-[calc(100vh_-_theme(spacing.16))] w-full">
      {/* <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold pl-5">Chat</h1>
        <ChatSettings chatConfig={chatConfig}/>
      </div>
      <ChatUI/> */}
    </div>
  );
}
