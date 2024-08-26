import { createAsyncThunk } from "@reduxjs/toolkit";
import { Chat, Message } from "../../../db";
import { mockChats } from "../../../mock-data/chats";

export const fetchChatByContactId = createAsyncThunk<Chat, string>(
  "chat/fetchChatByContactId",
  async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const chat = mockChats.chats.find((chat) => chat.contactId === id);

    if (!chat) {
      throw new Error(`Chat with contactId ${id} not found`);
    }

    const sanitizedChat: Chat = {
      ...chat,
      messages: chat.messages.map((message) => ({
        ...message,
        sender: message.sender as "user" | "contact",
      })),
    };

    const storedChat = localStorage.getItem(`chat_${sanitizedChat.contactId}`);

    if (storedChat) {
      return JSON.parse(storedChat) as Chat;
    }

    return sanitizedChat;
  }
);

export const fetchLastMessages = createAsyncThunk<
  Record<string, Message | null>
>("chat/fetchLastMessages", async (_, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const lastMessages: Record<string, Message | null> = {};
    mockChats.chats.forEach((chat) => {
      const lastMessage =
        chat.messages.length > 0
          ? {
              ...chat.messages[chat.messages.length - 1],
              sender: chat.messages[chat.messages.length - 1].sender as
                | "user"
                | "contact",
            }
          : null;
      lastMessages[chat.contactId] = lastMessage;
    });

    return lastMessages;
  } catch (error) {
    return rejectWithValue("Failed to fetch last messages");
  }
});
