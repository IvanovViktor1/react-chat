import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, Message } from "../../../db";
import { fetchChatByContactId, fetchLastMessages } from "./fetchChat";

interface ChatsState {
  currentChat: Chat | null;
  lastMessages: Record<string, Message | null>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ChatsState = {
  currentChat: null,
  lastMessages: {},
  status: "idle",
  error: null,
};
interface NewChatPayload {
  id: string;
  contactId: string;
  messages: Message[];
  lastMessageTimestamp: number;
}
const chatsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessageToCurrentChat(state, action: PayloadAction<Message>) {
      if (
        state.currentChat &&
        action.payload.chatId === state.currentChat.id &&
        !state.currentChat.messages.find((m) => m.id === action.payload.id)
      ) {
        state.currentChat.messages.push(action.payload);
        state.currentChat.lastMessageTimestamp = action.payload.timestamp;
        state.lastMessages[state.currentChat.contactId] = action.payload;
      }
    },
    setMessagesFromLocalStorage(state, action: PayloadAction<Message[]>) {
      if (state.currentChat) {
        state.currentChat.messages = action.payload;
        state.lastMessages[state.currentChat.contactId] =
          action.payload[action.payload.length - 1];
      }
    },
    loadChatFromLocalStorage(state, action: PayloadAction<Chat>) {
      state.currentChat = action.payload;
    },
    createNewChat(state, action: PayloadAction<NewChatPayload>) {
      const newChat: Chat = {
        id: action.payload.id,
        contactId: action.payload.contactId,
        messages: action.payload.messages,
        lastMessageTimestamp: action.payload.lastMessageTimestamp,
      };
      state.currentChat = newChat;
      state.lastMessages[newChat.contactId] = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatByContactId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchChatByContactId.fulfilled,
        (state, action: PayloadAction<Chat>) => {
          state.status = "succeeded";
          state.currentChat = action.payload;
        }
      )
      .addCase(fetchChatByContactId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load chat data";
      })

      .addCase(fetchLastMessages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchLastMessages.fulfilled,
        (state, action: PayloadAction<Record<string, Message | null>>) => {
          state.status = "succeeded";
          state.lastMessages = action.payload;
        }
      )
      .addCase(fetchLastMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const {
  addMessageToCurrentChat,
  loadChatFromLocalStorage,
  setMessagesFromLocalStorage,
  createNewChat,
} = chatsSlice.actions;

export default chatsSlice.reducer;
