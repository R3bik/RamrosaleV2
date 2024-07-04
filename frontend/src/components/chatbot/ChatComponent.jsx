import React, { useState, useEffect } from "react";
import axios from "axios";
import { TbMessageChatbot } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: textInput,
      });

      const newMessage = { name: "User", message: textInput };
      const responseMessage = {
        name: "Chatbot",
        message: response.data.answer,
      };

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
        responseMessage,
      ]);
      setTextInput("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Event listener for Enter key to send message
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && textInput.trim() !== "") {
        sendMessage(); // Call sendMessage function here
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [textInput]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="flex items-center justify-center w-[60px] h-[60px] bg-secondary-black rounded-full text-third text-3xl focus:outline-none"
        onClick={toggleChat}
      >
        <TbMessageChatbot />
      </button>
      {isOpen && (
        <div className="w-80 min-h-[40vh] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-primary-black">
            <div className="text-lg font-bold text-white">Chat Support</div>
            <button
              className="text-white text-2xl focus:outline-none"
              onClick={toggleChat}
            >
              <IoCloseOutline />
            </button>
          </div>
          <div className="p-4 h-[45vh] overflow-y-scroll">
            <div className="space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    msg.name === "Chatbot" ? "bg-gray-200" : "bg-blue-200"
                  }`}
                >
                  <div className="font-semibold">{msg.name}</div>
                  <div>{msg.message}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center border-t bg-primary-black border-gray-300 px-4 py-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-white"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message here..."
            />
            <button
              className="ml-2 px-4 py-2 bg-third text-black rounded-md"
              onClick={sendMessage} // Corrected onClick handler
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
