import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../db";
import { fetchAllUsers } from "./fetchUsers";

interface UserState {
  users: User[] | null;
  currentUser: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  users: null,
  currentUser: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
