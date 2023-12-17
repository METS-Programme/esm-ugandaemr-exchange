import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ChatbotComponent from "./chat-bot.component";
import chatIcon from "../../../assets/images/chat-icon.png";
import styles from "./chatbot-button.module.scss";

const ChatbotButton = () => {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const launchChatBotChat = useCallback(() => {
    setIsChatOpen(true);
  }, []);

  const closeChatbotChat = useCallback(() => {
    setIsChatOpen(false);
  }, []);
  return (
    <>
      <button onClick={launchChatBotChat} className={styles.botButton}>
        <img src={chatIcon} alt="Chat Icon" />
      </button>
      {isChatOpen && <ChatbotComponent closeChatbotChat={closeChatbotChat} />}
    </>
  );
};

export default ChatbotButton;
