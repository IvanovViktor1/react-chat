import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import {
  HeartTwoTone,
  PhoneTwoTone,
  VideoCameraTwoTone,
} from "@ant-design/icons";

import "./contact-info.css";

const ContactInfo: FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  return (
    <div className={"contact-info"}>
      <img className="contact-info__img" src={currentUser?.photo} alt="img" />
      <span className="contact-info__name">{currentUser?.name}</span>
      <div className="contact-info__btns">
        <PhoneTwoTone
          style={{ backgroundColor: "#007c07" }}
          className="contact-info__btns__btn"
          twoToneColor={"#ffffff"}
        />
        <VideoCameraTwoTone
          style={{ backgroundColor: "#00a5b3" }}
          className="contact-info__btns__btn"
          twoToneColor={"#ffffff"}
        />
        <HeartTwoTone
          style={{ backgroundColor: "#df0000" }}
          className="contact-info__btns__btn"
          twoToneColor={"#ffffff"}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
