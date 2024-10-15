import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {Message} from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStream = async (
  input: string,
  chatMessages: Message[],
  api: string,
  chatId: string,
) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie ?? ""}`;
    const parts = value.split(`; ${name}=`);
    if (parts && parts.length === 2) {
      return parts.pop()?.split(";").shift();
    } else {
      return null;
    }
  };
  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
    // body: JSON.stringify(input, (_k, v) => v === null ? undefined : v)
    body: JSON.stringify({
      input: input,
      messages: chatMessages,
      chat_id: chatId,
    }),
  });

  if (!response.ok) throw new Error(response.statusText);

  return response.body;
};

export const getChatHistory = async (chatId: string) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie ?? ""}`;
    const parts = value.split(`; ${name}=`);
    if (parts && parts.length === 2) {
      return parts.pop()?.split(";").shift();
    } else {
      return null;
    }
  };
  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/chat/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
  });

  if (!response.ok) {
    console.log(response.statusText);
    return;
  }

  return await response.json();
};

// export const saveChatHistory = async (chatId: string, chatMessages: Message[]) => {
//   const getCookie = (name: string) => {
//     const value = `; ${document.cookie ?? ''}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts && parts.length === 2) { return parts.pop()?.split(';').shift() }
//     else { return null };
//   };
//   const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/api/v1/chat/save`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${getCookie("access_token")}`
//     },
//     body: JSON.stringify({
//       chat_id: chatId,
//       messages: chatMessages,
//     })
//   });

//   if (!response.ok) {
//     console.log(response.statusText);
//     return;
//   }

//   return response.body;
// };

export async function* decodeStreamToJson(
  data: ReadableStream<Uint8Array> | null,
): AsyncIterableIterator<string> {
  if (!data) return;

  const reader = data.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const {value, done} = await reader.read();
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
