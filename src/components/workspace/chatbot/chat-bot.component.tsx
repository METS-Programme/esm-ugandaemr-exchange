import React, { useState } from "react";
import styles from "./chatbot.scss";
import { ChevronDown, SendAltFilled } from "@carbon/react/icons";

interface ChatMessage {
  type: "incoming" | "outgoing";
  text: string;
}

interface ChatbotChatProps {
  closeChatbotChat: () => void;
}

const ChatbotComponent: React.FC<ChatbotChatProps> = ({ closeChatbotChat }) => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const addChatMessage = (message: string, type: "incoming" | "outgoing") => {
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { type, text: message },
    ]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserMessage(event.target.value);
  };

  const responses = [
    { input: "hey", response: "Hello! How can I help you today?" },
    {
      input: "how do I use the data visualizer",
      response:
        "Click on Data Visualizer on the left panel. Expand Report filters by clicking the arrow on the right. Choose either fixed or dynamic report.",
    },
    // ... to add more responses
  ];

  const getResponse = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const match = responses.find((r) =>
      trimmedInput.includes(r.input.toLowerCase())
    );
    return match ? match.response : "Sorry, I didn't understand that.";
  };

  const handleSendChat = () => {
    if (!userMessage.trim()) return;

    addChatMessage(userMessage.trim(), "outgoing");

    const botResponse = getResponse(userMessage.trim());

    setTimeout(() => {
      addChatMessage(botResponse, "incoming");
    }, 1000);

    setUserMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendChat();
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotBox}>
        <div className={styles.chatbotHeader}>
          <span>Chatbot</span>
          <button onClick={closeChatbotChat} className={styles.arrowButton}>
            <ChevronDown />
          </button>
        </div>
        <div className={styles.chatbotMessages}>
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`${styles["chat-message"]} ${styles[msg.type]}`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.chatbotInput}>
          <textarea
            value={userMessage}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button onClick={handleSendChat}>
            <SendAltFilled size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotComponent;
