import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../../db";
import { mockUsers } from "../../../mock-data/users";

export const fetchAllUsers = createAsyncThunk<User[]>(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      return mockUsers;
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);
