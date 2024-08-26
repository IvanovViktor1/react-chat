import { FC } from "react";

interface MessageProps {
  owner: boolean;
  text: string;
}

const Message: FC<MessageProps> = ({ owner, text }) => {
  return (
    <div className={owner ? "message message--owner" : "message"}>
      <div className="message__content">{text}</div>
    </div>
  );
};

export default Message;
