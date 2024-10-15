import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { getStream, decodeStreamToJson } from "../utils";
import { Message } from "@/lib/definitions"
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { usePathname } from "next/navigation";

const BOT_ERROR_MESSAGE = 'Something went wrong fetching AI response.';

const useChatStream = (endpoint: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const pathName = usePathname();
    const chatId = pathName.split("/").pop() ?? "";
    // const handleInputChange = (value: string) => {
    //     setInput(value);
    // }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        if (input === null || input === '') {
            return; // Do nothing if input is null or empty
        }
        await resetInputAndGetResponse();
    }

    const addMessage = (message: Message) => {
        setMessages(messages => [...messages, message]);
    };

    const appendMessageToChat = (message: string) => {
        setMessages(messages => {
            const latestMessage = messages[messages.length - 1];

            return [
                ...messages.slice(0, -1),
                { ...latestMessage, content: latestMessage.content + message },
            ];
        });
    };

    const fetchAndUpdateAIResponse = async () => {
        // console.log(pathName);
        const stream = await getStream(input, messages, endpoint, chatId);
        addMessage({ content: '', role: 'assistant' });
        let response = '';

        for await (const message of decodeStreamToJson(stream)) {
            appendMessageToChat(message);
            response += message;
        }

        // return { ...initialMessage, content: response };
    };

    const resetInputAndGetResponse = async (message?: string) => {
        setIsStreaming(true);
        addMessage({ content: message ?? input, role: 'user' });
        // await input.handlers.onMessageAdded?.(addedMessage);
        setInput('');

        try {
            await fetchAndUpdateAIResponse();
            // await input.handlers.onMessageAdded?.(addedMessage);
        } catch {
            addMessage({ content: BOT_ERROR_MESSAGE, role: 'assistant' });
            // await input.handlers.onMessageAdded?.(addedMessage);
        } finally {
            setIsStreaming(false);
        }
    }

    // useEffect(() => {
    //     console.log(messages);
    //     // saveChatHistory(chatId, messages);
    // }, [messages]);

    return {
        messages,
        input,
        isStreaming,
        handleInputChange,
        handleSubmit,
        setMessages,
    };
}

export default useChatStream;
