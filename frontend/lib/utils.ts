import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Message } from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getStream = async (input: string,chatMessages: Message[], api: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + api, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(input, (_k, v) => v === null ? undefined : v)
    body: JSON.stringify({ 
      input: input,
      messages: chatMessages
    })
  });

  if (!response.ok) throw new Error(response.statusText);

  return response.body;
};

export async function* decodeStreamToJson(
  data: ReadableStream<Uint8Array> | null,
): AsyncIterableIterator<string> {
  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    if (value) {
      try {
        yield decoder.decode(value);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
