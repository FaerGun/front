import React, { useState, useEffect } from 'react';
import '../App.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    document.body.classList.add('chat-open');
    return () => {
      document.body.classList.remove('chat-open');
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setMessages(prev => [...prev, { text: inputMessage, isBot: false }]);
    setInputMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        <div className="chat-header"></div>
        <h1 className="chat-title">Собеседование backend-разработчика</h1>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="chat-input-container">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Напишите что-нибудь..."
            className="chat-input"
          />
          <button type="submit" className="send-button"></button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 