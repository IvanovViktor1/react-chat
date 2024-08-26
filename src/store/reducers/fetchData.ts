import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChats = createAsyncThunk("chats/fetchChats", async () => {
  const response = await fetch("/api/chats");
  const data = await response.json();
  return data;
});

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (chatId) => {
    const response = await fetch(`/api/chats/${chatId}/messages`);
    const data = await response.json();
    return data;
  }
);

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  return data;
});
