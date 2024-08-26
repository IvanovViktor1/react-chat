import React, { useState, useEffect } from "react";

import "./App.css";
import Drawer from "./components/drawer";
import Chat from "./components/chat";
import ContactInfo from "./components/contact-info";
import { useDispatch } from "react-redux";
import {
  fetchChatByContactId,
  fetchLastMessages,
} from "./store/reducers/chat/fetchChat";
import { AppDispatch, RootState } from "./store/store";
import { fetchAllUsers } from "./store/reducers/user/fetchUsers";
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { User } from "./db";
import { setCurrentUser } from "./store/reducers/user/userSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const users = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    if (users) {
      dispatch(setCurrentUser(users[0]));
    }
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchChatByContactId(currentUser.id));
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(fetchAllUsers());
    dispatch(fetchLastMessages());
  }, []);

  return (
    <div className="App">
      <Drawer />
      <Chat />
      <ContactInfo />
    </div>
  );
}

export default App;
