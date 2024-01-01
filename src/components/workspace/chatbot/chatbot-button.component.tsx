import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ChatbotComponent from "./chat-bot.component";
import chatIcon from "../../../assets/images/chat-icon.png";
import styles from "./chatbot-button.module.scss";

const ChatbotButton = () => {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  const launchChatBotChat = useCallback(() => {
    setIsChatOpen(true);
    setShowMessage(false);
  }, []);

  const closeChatbotText = useCallback(() => {
    setShowMessage(false);
  }, []);

  const closeChatbotChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  return (
    <div className={styles.chatbotButtonContainer}>
      {showMessage && (
        <div className={styles.messageContainer}>
          <span className={styles.chatbotText}>
            Hello and welcome to UgandaEMR plus Chatbot
          </span>
          <button className={styles.closeButton} onClick={closeChatbotText}>
            x
          </button>
        </div>
      )}
      <button
        onClick={launchChatBotChat}
        className={styles.botButton}
        type="button"
      >
        <img src={chatIcon} alt="Chat Icon" />
      </button>
      <div className={isChatOpen ? styles.chatOpen : styles.chatClosed}>
        <ChatbotComponent closeChatbotChat={closeChatbotChat} />
      </div>
    </div>
  );
};

export default ChatbotButton;
