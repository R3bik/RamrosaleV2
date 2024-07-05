import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { IoCloseOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  const sendMessage = useCallback(async () => {
    if (textInput.trim() === "") return;

    const newMessage = {
      name: "User",
      message: textInput,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTextInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: textInput,
      });

      const responseMessage = {
        name: "Saly",
        message: response.data.answer,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prevMessages) => [...prevMessages, responseMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error:", error);
      setIsTyping(false);
    }
  }, [textInput]);

  useEffect(() => {
    // Scroll to the latest message
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
  }, [textInput, sendMessage]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          className={`flex items-center justify-center w-16 h-16 bg-secondary-black rounded-full text-third text-3xl focus:outline-none transition-transform ${
            isOpen ? "transform rotate-45" : ""
          }`}
          onClick={toggleChat}
        >
          <MdSupportAgent />
        </button>
      )}
      {isOpen && (
        <div className="w-80 min-h-[40vh] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all transform translate-y-0 opacity-100 duration-300">
          <div className="flex items-center justify-between px-4 py-3 bg-primary-black text-white">
            <div className="flex items-center space-x-2">
              <MdSupportAgent className="text-2xl" />
              <span className="text-lg font-bold">Chat Support</span>
              <span className="ml-2 px-2 py-1 bg-green-500 text-xs rounded-full">
                Online
              </span>
            </div>
            <button
              className="text-2xl focus:outline-none"
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
                  className={`flex flex-col ${
                    msg.name === "Saly" ? "items-start" : "items-end"
                  }`}
                >
                  <div
                    className={`flex items-center space-x-2 mb-1 ${
                      msg.name === "Saly" ? "justify-start" : "justify-end"
                    }`}
                  >
                    <span
                      className={`text-xs text-gray-500 ${
                        msg.name === "Saly" ? "order-2" : "order-1"
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                    <span
                      className={`font-semibold ${
                        msg.name === "Saly" ? "order-1" : "order-2"
                      }`}
                    >
                      {msg.name}
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-lg max-w-[calc(100% - 2rem)] shadow overflow-hidden ${
                      msg.name === "Saly"
                        ? "bg-gray-200 text-left"
                        : "bg-blue-500 text-white text-right"
                    }`}
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    <div>{msg.message}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center space-x-2 mb-1 justify-start">
                    <span className="font-semibold">Saly</span>
                    <span className="text-xs text-gray-500">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="p-2 bg-gray-200 rounded-lg max-w-[calc(100% - 2rem)] flex items-center">
                    <ImSpinner2 className="animate-spin mr-2" />
                    <div>Typing...</div>
                  </div>
                </div>
              )}
              <div ref={messageEndRef}></div>
            </div>
          </div>
          <div className="flex items-center border-t bg-primary-black border-gray-300 px-4 py-2 relative">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition-colors duration-200"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your message here..."
            />
            <button
              className="ml-2 p-2 bg-third text-black rounded-full transition-colors duration-200 focus:outline-none"
              onClick={sendMessage}
            >
              <BiSend className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
