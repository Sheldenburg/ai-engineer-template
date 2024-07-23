"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import initiateClient from "@/lib/api";

export async function continueConversation(messages: CoreMessage[]) {
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  const stream = createStreamableValue(result.textStream);
  console.log(messages);
  return stream.value;
}

export async function messageTest(messages: CoreMessage[]) {
  const client = initiateClient();
  const { data, error } = await client.GET("/api/v1/ai/chat/test", {});
  if (error) {
    console.log(error);
  }
  return data[1].content;
}
