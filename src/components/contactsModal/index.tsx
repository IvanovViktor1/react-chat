import React, { useState, FC } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { User } from "../../db";

import "./contactsModal.css";
import { CloseOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { createNewChat } from "../../store/reducers/chat/chatSlice";
import { setCurrentUser } from "../../store/reducers/user/userSlice";

interface ContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactsModal: FC<ContactsModalProps> = ({ isOpen, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.user.users);

  const handleConfirm = (contact: User) => {
    dispatch(
      createNewChat({
        id: contact.id,
        contactId: contact.id,
        messages: [],
        lastMessageTimestamp: Date.now(),
      })
    );

    dispatch(setCurrentUser(contact));

    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {isOpen &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal__header">
                <span className="modal__header-title">Выбор собесдника..</span>
                <CloseOutlined
                  className="modal__header-close"
                  onClick={onClose}
                />
              </div>

              {contacts &&
                contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="modal__item"
                    onClick={() => handleConfirm(contact)}
                  >
                    <img
                      loading="lazy"
                      src={contact.photo}
                      alt="img"
                      className="modal__item-img"
                    />
                    <span>{contact.name}</span>
                  </div>
                ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default ContactsModal;
