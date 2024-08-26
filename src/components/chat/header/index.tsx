import { FC } from "react";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

import {
  HeartTwoTone,
  PhoneTwoTone,
  VideoCameraTwoTone,
} from "@ant-design/icons";

import "./header.css";

const HeaderChat: FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div className="chat__header">
      <img className="chat__header-img" src={currentUser?.photo} alt="img" />
      <span className="chat__header-contact-name">{currentUser?.name}</span>
      <div className="chat__header-btns">
        <PhoneTwoTone
          style={{ backgroundColor: "#007c07" }}
          className="chat__header-btn"
          twoToneColor={"#ffffff"}
        />
        <VideoCameraTwoTone
          style={{ backgroundColor: "#00a5b3" }}
          className="chat__header-btn"
          twoToneColor={"#ffffff"}
        />
        <HeartTwoTone
          style={{ backgroundColor: "#df0000" }}
          className="chat__header-btn"
          twoToneColor={"#ffffff"}
        />
      </div>
    </div>
  );
};

export default HeaderChat;
