import React, { useRef, useState } from "react";
import styles from "./chatbot.scss";
import {
  ChevronDown,
  MachineLearning,
  SendAltFilled,
} from "@carbon/react/icons";

interface ChatMessage {
  type: "incoming" | "outgoing";
  text: string;
}

interface ChatbotChatProps {
  closeChatbotChat: () => void;
}

const ChatbotComponent: React.FC<ChatbotChatProps> = ({ closeChatbotChat }) => {
  const [input, setInput] = useState("");
  const chatInputRef = useRef(null);

  const handleInputChange = (e) => {
    if (chatInputRef?.current && chatInputRef.current.contains(e.target)) {
      setInput(e.target.value);
    }
  };
  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader}>
        <span>Chatbot</span>
        <button onClick={closeChatbotChat} className={styles.arrowButton}>
          <ChevronDown />
        </button>
      </div>
      <ul className={styles.chatBox}>
        <li className={`${styles.incoming} ${styles.chat}`}>
          <span>
            <MachineLearning size="24" />
          </span>
          <p>
            Hi there <br />
            How can I help you today?
          </p>
        </li>
        <li className={`${styles.outgoing} ${styles.chat}`}>
          <p>Lorem ipsum dolor </p>
        </li>
      </ul>
      <div className={styles.chatbotInput}>
        <textarea
          placeholder="Type a message..."
          required
          onChange={handleInputChange}
          id="content"
          ref={chatInputRef}
          value={input}
        />
        <span>
          <SendAltFilled size={32} />
        </span>
      </div>
    </div>
  );
};

export default ChatbotComponent;
