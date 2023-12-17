// ChatbotComponent.tsx
import React, { useState } from "react";
import styles from "./chatbot.scss"; // Make sure the CSS file is in the same directory

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

  // Define your responses
  const responses = [
    { input: "hey", response: "Hello! How can I help you today?" },
    {
      input: "how are you",
      response: "I'm a bot, so I don't have feelings, but thanks for asking!",
    },
    // ... more responses
  ];

  // Function to get a response based on the input
  const getResponse = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    const match = responses.find((r) =>
      trimmedInput.includes(r.input.toLowerCase())
    );
    return match ? match.response : "Sorry, I didn't understand that.";
  };

  const handleSendChat = () => {
    if (!userMessage.trim()) return;

    // Add user's message to chatMessages
    addChatMessage(userMessage.trim(), "outgoing");

    // Get the bot response
    const botResponse = getResponse(userMessage.trim());

    // Simulate a delay to mimic real chatting experience
    setTimeout(() => {
      addChatMessage(botResponse, "incoming");
    }, 1000);

    // Clear the input after sending the message
    setUserMessage("");
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotBox}>
        <div className={styles.chatbotHeader}>Chatbot</div>
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
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button onClick={handleSendChat}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotComponent;
