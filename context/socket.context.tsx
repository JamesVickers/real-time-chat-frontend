import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/config";
import EVENTS from "../config/events";

interface Message {
  body: string;
}

interface Context {
  socket: Socket;
  message?: Message;
  setMessage: Function;
  conversation?: Message[];
  setConversation: Function;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setMessage: () => false,
  conversation: [],
  setConversation: () => false,
});

const SocketsProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<Message>();
  const [conversation, setConversation] = useState<Message[]>([]);

  // useEffect(() => {
  socket.on("chat", (payload) => {
    console.log("payload: ", payload);
    // setMessage(payload);
    setConversation([...conversation, payload]);
  });
  // });

  // useEffect(() => {
  //   socket.on(EVENTS.SERVER.NEW_MESSAGE, (payload) => {
  //     console.log("payload: ", payload);

  //     setConversation([...conversation, payload]);
  //   });
  // });

  return (
    <SocketContext.Provider
      value={{
        socket,
        message,
        setMessage,
        conversation,
        setConversation,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
