import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Message from "./Message";

import "./messagesBlock.css";

const MessagesBlock: FC = () => {
  const currentChat = useSelector(
    (state: RootState) => state.chats.currentChat
  );

  return (
    <div className="messages-block">
      {currentChat?.messages
        .map((m) => (
          <Message key={m.id} owner={m.sender === "user"} text={m.text} />
        ))
        .reverse()}
    </div>
  );
};

export default MessagesBlock;
