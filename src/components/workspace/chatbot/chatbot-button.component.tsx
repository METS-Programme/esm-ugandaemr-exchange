import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ChatbotComponent from "./chat-bot.component";
import styles from "./chatbot-button.scss";
import { showNotification, useSession } from "@openmrs/esm-framework";
import { getCareProvider } from "./chatbot.resource";
import { ChatBot } from "@carbon/react/icons";

const ChatbotButton = () => {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const sessionUser = useSession();

  const displayText = t("ifhis", "IFHIS");
  const [provider, setProvider] = useState("");

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

  useEffect(() => {
    getCareProvider(sessionUser?.user?.systemId).then(
      (response) => {
        const providerData = response?.data?.results[0];
        setProvider(providerData.person.display);
      },
      (error) => {
        showNotification({
          title: t(`errorGettingProvider', 'Couldn't get provider`),
          kind: "error",
          critical: true,
          description: error?.message,
        });
      }
    );
  }, [sessionUser?.user?.systemId, t]);

  return (
    <div className={styles.chatbotButtonContainer}>
      {showMessage && (
        <div className={styles.messageContainer}>
          <span className={styles.chatbotText}>
            Hello {provider}, Welcome to {displayText} Chatbot
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
        <ChatBot size={24} />
      </button>
      <div className={isChatOpen ? styles.chatOpen : styles.chatClosed}>
        <ChatbotComponent closeChatbotChat={closeChatbotChat} />
      </div>
    </div>
  );
};

export default ChatbotButton;
