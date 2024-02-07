import React, { useEffect, useRef, useState } from "react";
import styles from "./chatbot.scss";
import {
  ChevronDown,
  MachineLearning,
  Renew,
  SendAltFilled,
} from "@carbon/react/icons";
import { InlineLoading } from "@carbon/react";

interface ChatMessage {
  type: "incoming" | "outgoing";
  text: string;
}

interface ChatbotChatProps {
  closeChatbotChat: () => void;
}

const ChatbotComponent: React.FC<ChatbotChatProps> = ({ closeChatbotChat }) => {
  const [userInput, setUserInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      type: "incoming",
      text: "Hi there\nHow can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendChat();
    }
  };

  const refreshChat = () => {
    setChatMessages([
      {
        type: "incoming",
        text: "Hi there\nHow can I help you today?",
      },
    ]);
  };

  const handleSendChat = () => {
    const newMessage: ChatMessage = {
      type: "outgoing",
      text: userInput,
    };

    setChatMessages([...chatMessages, newMessage]);

    setIsLoading(true);
    setTimeout(() => {
      const botResponse: ChatMessage = {
        type: "incoming",
        text: "This is a bot response.",
      };
      setChatMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsLoading(false);
    }, 1000);

    setUserInput("");
  };

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader}>
        <span>Chatbot</span>
        <button onClick={refreshChat} className={styles.refreshButton}>
          <Renew />
        </button>
        <button onClick={closeChatbotChat} className={styles.arrowButton}>
          <ChevronDown />
        </button>
      </div>
      <ul className={styles.chatBox}>
        {chatMessages.map((message, index) => (
          <li
            key={index}
            ref={index === chatMessages.length - 1 ? lastMessageRef : null}
            className={`${styles[message.type]} ${styles.chat}`}
          >
            {message.type === "incoming" && (
              <span>
                <MachineLearning size="24" />
              </span>
            )}
            <p>{message.text}</p>
          </li>
        ))}
        {isLoading && (
          <InlineLoading
            status="active"
            iconDescription="Loading"
            description="Loading..."
          />
        )}
      </ul>
      <div className={styles.chatbotInput}>
        <textarea
          placeholder="Message Chatbot..."
          required
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          id="content"
          value={userInput}
        />
        <span>
          <SendAltFilled size={32} onClick={handleSendChat} />
        </span>
      </div>
    </div>
  );
};

export default ChatbotComponent;
