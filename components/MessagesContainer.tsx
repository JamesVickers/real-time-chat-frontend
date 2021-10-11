import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

const MessagesContainer = () => {
  const { socket, message, setMessage, conversation, setConversation } =
    useSockets();

  const newMessageRef = useRef(null);

  const onSubmitMessage = () => {
    // get message
    const body = newMessageRef.current.value || "";

    if (!String(body).trim()) return;

    // emit message created event
    socket.emit(EVENTS.CLIENT.CREATE_MESSAGE, { body });
    // socket.emit("chat", { body });

    // set message input back to empty string
    newMessageRef.current.value = "";
  };

  return (
    <>
      <form>
        <textarea
          placeholder="What's on your mind?"
          rows={3}
          ref={newMessageRef}
        />
        <button onClick={onSubmitMessage}>Send message</button>
      </form>

      <h3>Message: </h3>

      {message}

      <h3>Conversation: </h3>

      {conversation &&
        conversation.map((message, index) => {
          return (
            <div key={index}>
              <p>{message.body}</p>
            </div>
          );
        })}
    </>
  );
};

export default MessagesContainer;
