import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user/userSlice";
import chatsReducer from "./reducers/chat/chatSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    chats: chatsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
