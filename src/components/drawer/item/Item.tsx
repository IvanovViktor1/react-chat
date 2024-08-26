import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatByContactId } from "../../../store/reducers/chat/fetchChat";
import { AppDispatch, RootState } from "../../../store/store";
import { setCurrentUser } from "../../../store/reducers/user/userSlice";
import { User } from "../../../db";

import "./drawerItem.css";

interface DrawerItemProps {
  chatId: string;
  contactId: string;
  name: string;
  photoUrl: string;
  lastMessage: string;
  timestamp: number;
}

const DrawerItem: FC<DrawerItemProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const currentChat = useSelector(
    (state: RootState) => state.chats.currentChat
  );
  const users = useSelector((state: RootState) => state.user.users);

  const handleClick = () => {
    dispatch(
      setCurrentUser(users?.find((u) => u.id === props.contactId) as User)
    );
    dispatch(fetchChatByContactId(props.contactId));
  };

  const formattedTime = new Date(props.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="drawer__item"
      style={{
        backgroundColor:
          currentChat?.id === props.chatId ? "#30b74a4d" : "white",
      }}
      onClick={handleClick}
    >
      <img
        loading="lazy"
        className="drawer__item-img"
        src={props.photoUrl}
        alt="img"
      />
      <article className="drawer__item-text">
        <span className="drawer__item-name">{props.name}</span>
        <div className="drawer__item-message">
          <span>{props.lastMessage}</span>
          <span>{formattedTime}</span>
        </div>
      </article>
    </div>
  );
};

export default DrawerItem;
