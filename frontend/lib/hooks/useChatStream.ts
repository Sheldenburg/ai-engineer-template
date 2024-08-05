import { useState, FormEvent, ChangeEvent } from "react";
import { getStream, decodeStreamToJson } from "../utils";
import { Message } from "@/lib/definitions"

const BOT_ERROR_MESSAGE = 'Something went wrong fetching AI response.';

const useChatSteam = (endpoint: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [model, setModel] = useState<string | null>(null);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [temperature, setTemperature] = useState<number | null>(0.4);
    const [topP, setTopP] = useState<number | null>(1.0);
    const [topK, setTopK] = useState<number | null>(null);
    const [systemMessage, setSystemMessage] = useState<string | null>(null);

    // const handleInputChange = (value: string) => {
    //     setInput(value);
    // }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
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
        const stream = await getStream(input, messages, endpoint);
        addMessage({ content: '', role: 'assistant' });
        console.log(messages);
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
        console.log(messages);
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

    return {
        messages,
        input,
        isStreaming,
        handleInputChange,
        handleSubmit,
        model,
        apiKey,
        temperature,
        topP,
        topK,
        systemMessage,
        setModel,
        setApiKey,
        setTemperature,
        setTopP,
        setTopK,
        setSystemMessage,
    };
}

export default useChatSteam;