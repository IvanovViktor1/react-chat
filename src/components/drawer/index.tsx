import { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import DrawerItem from "./item/Item";
import { PlusOutlined } from "@ant-design/icons";

import "./drawer.css";
import ContactsModal from "../contactsModal";

const Drawer: FC = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const lastMessages = useSelector(
    (state: RootState) => state.chats.lastMessages
  );
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="drawer">
      <ContactsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <div className="drawer__btn" onClick={() => setModalOpen(!modalOpen)}>
        <PlusOutlined className="drawer__btn-add" />
      </div>

      {users &&
        Object.entries(lastMessages)
          .sort(([, messageA], [, messageB]) => {
            if (!messageA || !messageB) return 0;
            return messageB.timestamp - messageA.timestamp;
          })
          .map(([contactId, message]) => (
            <div key={contactId}>
              {message && users && (
                <DrawerItem
                  key={users.find((u) => u.id === contactId)?.id as string}
                  chatId={message.chatId}
                  contactId={contactId}
                  photoUrl={
                    users.find((u) => u.id === contactId)?.photo as string
                  }
                  name={users.find((u) => u.id === contactId)?.name as string}
                  lastMessage={message.text}
                  timestamp={message.timestamp}
                />
              )}
            </div>
          ))}
    </div>
  );
};

export default Drawer;
