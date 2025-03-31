import React, { useState } from 'react';
import '../App.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Привет! Я помогу вам выбрать подходящие курсы и ресурсы для обучения. Расскажите, какой у вас опыт в программировании?",
      isBot: true
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Имитация ответа бота
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Спасибо за информацию! Я подберу для вас подходящие курсы и ресурсы.",
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.isBot ? 'bot' : 'user'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Введите ваше сообщение..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">
          Отправить
        </button>
      </form>
    </div>
  );
};

export default Chat; 