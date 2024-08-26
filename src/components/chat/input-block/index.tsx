import { useState } from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { addMessageToCurrentChat } from "../../../store/reducers/chat/chatSlice";
import { Message } from "../../../db";

import TelegramIcon from "@mui/icons-material/Telegram";
import "./input-block.css";

const InputBlock = () => {
  const dispatch: AppDispatch = useDispatch();
  const [messageText, setMessageText] = useState("");

  const currentChat = useSelector(
    (state: RootState) => state.chats.currentChat
  );

  const handleSendMessage = () => {
    if (currentChat && messageText.trim().length > 0) {
      const newMessage = {
        id: Date.now().toString(),
        chatId: currentChat?.id,
        sender: "user",
        text: messageText,
        timestamp: Date.now(),
      };

      dispatch(addMessageToCurrentChat(newMessage as Message));

      const updatedMessages = [...currentChat.messages, newMessage];
      const updatedChat = {
        ...currentChat,
        messages: updatedMessages,
        lastMessageTimestamp: newMessage.timestamp,
      };

      localStorage.setItem(
        `chat_${currentChat.contactId}`,
        JSON.stringify(updatedChat)
      );
      setMessageText("");
    }
  };

  return (
    <div className="chat__input-block">
      <input
        type="text"
        className="chat__input-block-input"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
      />
      <TelegramIcon
        onClick={handleSendMessage}
        className="chat__input-block-btn-submit"
        sx={{ backgroundColor: "#00adff", color: "white" }}
      />
    </div>
  );
};

export default InputBlock;
