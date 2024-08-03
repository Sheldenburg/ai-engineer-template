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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { readStreamableValue } from "ai/rsc";
import { useState } from "react";
import useChatStream from "@/lib/hooks/useChatStream";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } =
    useChatStream("/api/v1/ai/chat/stream");

  return (
    <div className="flex flex-col h-[calc(100vh_-_theme(spacing.16))] w-full">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-bold pl-5">Chat</h1>
        <Drawer>
          <div className="flex">
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" className="items-end mr-3">
                <Settings className="size-6 mr-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </DrawerTrigger>
          </div>
          <DrawerContent className="max-h-[80vh] md:max-h-[50vh]">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the model and messages.
              </DrawerDescription>
            </DrawerHeader>
            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">Model</Label>
                  <Select>
                    <SelectTrigger
                      id="model"
                      className="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Rabbit className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Genesis
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="explorer">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Bird className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Explorer
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              Performance and speed for efficiency.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="quantum">
                        <div className="flex items-start gap-3 text-muted-foreground">
                          <Turtle className="size-5" />
                          <div className="grid gap-0.5">
                            <p>
                              Neural{" "}
                              <span className="font-medium text-foreground">
                                Quantum
                              </span>
                            </p>
                            <p className="text-xs" data-description>
                              The most powerful model for complex computations.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="temperature">Temperature</Label>
                  <Input id="temperature" type="number" placeholder="0.4" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-p">Top P</Label>
                  <Input id="top-p" type="number" placeholder="0.7" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="top-k">Top K</Label>
                  <Input id="top-k" type="number" placeholder="0.0" />
                </div>
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="You are a..." />
                </div>
              </fieldset>
            </form>
          </DrawerContent>
        </Drawer>
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
