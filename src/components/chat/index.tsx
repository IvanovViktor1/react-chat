import React, { FC } from "react";
import HeaderChat from "./header";
import MessagesBlock from "./messages-block";
import InputBlock from "./input-block";

const Chat: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <HeaderChat />
      <MessagesBlock />
      <InputBlock />
    </div>
  );
};

export default Chat;
