export interface Message {
  id: string;
  chatId: string;
  sender: "user" | "contact";
  text: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
  lastMessageTimestamp: number;
}

export interface User {
  id: string;
  name: string;
  photo: string;
}
