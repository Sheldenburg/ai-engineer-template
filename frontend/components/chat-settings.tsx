"use client";
import React from "react";
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
import { Bird, Rabbit, Settings, Turtle } from "lucide-react";
import initiateClient from "@/lib/api";
import { Button } from "@/components/ui/button";
import { addChatConfig } from "@/app/(protected)/chat/actions";
// import useSWR from "swr";

// function getCookie(name: string) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop()?.split(";").shift();
// }

// const fetcher = (url: string) =>
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getCookie("access_token")}`,
//     },
//     // Include other fetch options as needed
//   }).then((res) => res.json());

async function ChatSettings({}: // model,
// setModel,
// apiKey,
// setApiKey,
// temperature,
// setTemperature,
// topP,
// setTopP,
// topK,
// setTopK,
// systemMessage,
// setSystemMessage,
{
  // model: string | null;
  // setModel: React.Dispatch<React.SetStateAction<string | null>>;
  // apiKey: string | null;
  // setApiKey: React.Dispatch<React.SetStateAction<string | null>>;
  // temperature: number | null;
  // setTemperature: React.Dispatch<React.SetStateAction<number | null>>;
  // topP: number | null;
  // setTopP: React.Dispatch<React.SetStateAction<number | null>>;
  // topK: number | null;
  // setTopK: React.Dispatch<React.SetStateAction<number | null>>;
  // systemMessage: string | null;
  // setSystemMessage: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  // const { data, error } = useSWR(
  //   process.env.NEXT_PUBLIC_API_BASE_URL + "/api/v1/chat/config",
  //   fetcher
  // );
  // if (error) {
  //   console.log(error);
  // }
  // if (data) {
  //   setModel(data.model ?? null);
  //   setApiKey(data.api_key ?? null);
  //   setTemperature(data.temperature);
  //   setTopP(data.top_p ?? null);
  //   setTopK(data.top_k ?? null);
  //   setSystemMessage(data.system_message ?? null);
  // }
  // const handleModelSelectChange = (value: string) => {
  //   setModel(value);
  // };
  // const handleInputChangeTemperature = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (e.target.value === "") {
  //     setTemperature(0.4);
  //   } else {
  //     setTemperature(parseFloat(e.target.value));
  //   }
  // };
  // const handleInputChangeTopP = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value === "") {
  //     setTopP(1.0);
  //   } else {
  //     setTopP(parseFloat(e.target.value));
  //   }
  // };
  // const handleInputChangeSystemMessage = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (e.target.value === "") {
  //     setSystemMessage("");
  //   } else {
  //     setSystemMessage(e.target.value);
  //   }
  //   console.log(systemMessage);
  // };
  // const handleInputChangeAPIKey = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value === "") {
  //     setApiKey("");
  //   } else {
  //     setApiKey(e.target.value);
  //   }
  //   console.log(systemMessage);
  // };

  async function handleSubmit(formData: FormData) {
    // console.log('submitting form')
    const result = await addChatConfig(formData);
    // const result = await addUserswithCheckbox(formData);
    // if (result?.error) {
    //   resetForm();
    //   setOpen(false);
    //   return toast({
    //     title: "Something went wrong!",
    //     description: String(result.error),
    //     variant: "destructive",
    //   });
    // } else {
    //   resetForm();
    //   setOpen(false);
    //   return toast({
    //     title: "Success",
    //     description: "User was created successfully!",
    //   });
    // }
  }

  return (
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
        <form className="flex flex-col overflow-auto">
          <DrawerHeader>
            <div className="flex justify-between items-center">
              <div>
                <DrawerTitle className="text-start pl-3">
                  Configuration
                </DrawerTitle>
                <DrawerDescription className="text-start mt-2 pl-3">
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </div>
              <div className="md:mr-10 flex md:gap-5">
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  className="items-center ml-auto"
                  formAction={handleSubmit}
                >
                  Save
                </Button>
                {/* <Button variant="ghost" size="icon" className="items-end ml-auto">
                Cancel
              </Button> */}
              </div>
            </div>
          </DrawerHeader>
          <div className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="model">Model</Label>
                <Select
                  defaultValue="openai"
                  // onValueChange={handleModelSelectChange}
                  name="model"
                >
                  <SelectTrigger
                    id="model"
                    className="items-start [&_[data-description]]:hidden"
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <img
                          src="/icons8-chatgpt.svg"
                          className="size-5"
                          alt="gpt"
                        />
                        <div className="grid gap-0.5">
                          <p>
                            OpenAI{" "}
                            <span className="font-medium text-foreground">
                              GPT4o
                            </span>
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="google">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <img
                          src="/icons8-google.svg"
                          className="size-5"
                          alt="gemini"
                        />

                        <div className="grid gap-0.5">
                          <p>
                            Google{" "}
                            <span className="font-medium text-foreground">
                              Gemini 1.5Pro
                            </span>
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="anthropic">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <img
                          src="/icons8-claude.svg"
                          className="size-5"
                          alt="claude"
                        />

                        <div className="grid gap-0.5">
                          <p>
                            Anthropic{" "}
                            <span className="font-medium text-foreground">
                              Claude 3.0
                            </span>
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="APIKey">API Key</Label>
                <Input
                  id="api-key"
                  name="api-key"
                  type="password"
                  // onChange={handleInputChangeAPIKey}
                  // value={apiKey ?? ""}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  name="temperature"
                  type="number"
                  defaultValue="0.4"
                  // onChange={handleInputChangeTemperature}
                  // value={temperature ?? ""}
                  min={0}
                  max={2}
                  step={0.1}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input
                  id="top-p"
                  name="top-p"
                  type="number"
                  defaultValue="1.0"
                  // onChange={handleInputChangeTopP}
                  // value={topP ?? ""}
                  min={0}
                  max={1}
                  step={0.1}
                />
              </div>
              {/* <div className="grid gap-3">
              <Label htmlFor="top-k">Top K</Label>
              <Input id="top-k" type="number" placeholder="0.0" />
            </div> */}
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
                    {/* <SelectItem value="user">User</SelectItem>
                  <SelectItem value="assistant">Assistant</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content">Content</Label>
                <Input
                  id="system-message"
                  name="system-message"
                  placeholder="You are a..."
                  // className="min-h-10 max-h-60 w-full resize-none border-0 p-3 shadow-none focus-visible:ring-0 text-xs md:text-base"
                  // value={systemMessage ?? ""}
                  // onChange={handleInputChangeSystemMessage}
                  autoFocus
                />
              </div>
            </fieldset>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default ChatSettings;
