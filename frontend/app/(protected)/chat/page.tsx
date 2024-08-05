"use client";

import {
  Bird,
  CornerDownLeft,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Turtle,
  SquareUser,
  Bot,
} from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import useChatStream from "@/lib/hooks/useChatStream";
import ChatSettings from "@/components/chat-settings";

export default function ChatPage() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    apiKey,
    setApiKey,
    temperature,
    setTemperature,
    topK,
    setTopK,
    topP,
    setTopP,
    systemMessage,
    setSystemMessage,
    model,
    setModel,
  } = useChatStream("/api/v1/ai/chat/stream");

  return (
    <div className="flex flex-col h-[calc(100vh_-_theme(spacing.16))] w-full">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold pl-5">Chat</h1>
        <ChatSettings
          model={model}
          setModel={setModel}
          apiKey={apiKey}
          setApiKey={setApiKey}
          temperature={temperature}
          setTemperature={setTemperature}
          topP={topP}
          setTopP={setTopP}
          topK={topK}
          setTopK={setTopK}
          systemMessage={systemMessage}
          setSystemMessage={setSystemMessage}
        />
      </div>
      <div className="relative flex h-full overflow-auto flex-col rounded-xl bg-muted/50 md:m-3 mt-3 p-3 lg:col-span-2">
        {/* Display messages here */}
        <div className="mb-24 text-sm md:text-base">
          {messages.map((m, i) => (
            <div key={i} className="border-b border-gray-200">
              <div className="grid grid-cols-[26px_1fr] whitespace-pre-wrap py-3 md:p-3 items-start justify-start">
                {m.role === "user" ? (
                  <SquareUser className="pr-3 w-[32px] h-[32px]" />
                ) : (
                  <Bot className="pr-3 w-[32px] h-[32px]" />
                )}
                <div className="ml-4 items-center justify-center pt-1">
                  {m.content as string}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed inset-x-0 bottom-0 w-full px-5 md:w-1/2 md:left-1/3">
          <form
            className="relative mb-2 overflow-hidden rounded-lg border focus-within:ring-1 focus-within:ring-ring"
            x-chunk="dashboard-03-chunk-1"
            onSubmit={handleSubmit}
          >
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-10 max-h-60 w-full resize-none border-0 p-3 shadow-none focus-visible:ring-0 text-xs md:text-base"
              value={input}
              onChange={handleInputChange}
              autoFocus
            />
            <div className="relative flex items-center pt-0">
              {/* <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
              <Button
                type="submit"
                size="sm"
                className="absolute bottom-3 right-5 ml-auto gap-1.5"
              >
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
          <p className="text-center mb-2 text-[11px] md:text-xs">
            AI generated content can contain errors, check important info.
          </p>
        </div>
      </div>
    </div>
  );
}
