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
        
        <h1 className="chat-title">Собеседование backend-разработчика</h1>
        <div className='chat-list'>
        <svg className='chat-list-icon1' width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.45455 6.94444C5.45455 6.17738 6.06507 5.55556 6.81818 5.55556H8.18182C8.93493 5.55556 9.54545 6.17738 9.54545 6.94444V8.33333C9.54545 9.1004 8.93493 9.72222 8.18182 9.72222H6.81818C6.06507 9.72222 5.45455 9.1004 5.45455 8.33333V6.94444Z" fill="black"/>
<path d="M6.81818 11.1111C6.06507 11.1111 5.45455 11.7329 5.45455 12.5V13.8889C5.45455 14.6559 6.06507 15.2778 6.81818 15.2778H8.18182C8.93493 15.2778 9.54545 14.656 9.54545 13.8889V12.5C9.54545 11.7329 8.93493 11.1111 8.18182 11.1111H6.81818Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 6.94444C0 3.10913 3.0526 0 6.81818 0H23.1818C26.9474 0 30 3.10913 30 6.94444V18.0556C30 21.8909 26.9474 25 23.1818 25H6.81818C3.0526 25 0 21.8909 0 18.0556V6.94444ZM13.6364 2.77778H23.1818C25.4412 2.77778 27.2727 4.64326 27.2727 6.94444V18.0556C27.2727 20.3567 25.4412 22.2222 23.1818 22.2222H13.6364L13.6364 2.77778ZM10.9091 2.77778H6.81818C4.55884 2.77778 2.72727 4.64326 2.72727 6.94444V18.0556C2.72727 20.3567 4.55884 22.2222 6.81818 22.2222H10.9091L10.9091 2.77778Z" fill="black"/>
</svg>

        </div>
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
          <button type="submit" className="send-button">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="52" height="52" rx="26" fill="#B3DB32"/>
              <path d="M27.0607 13.4393C26.4749 12.8536 25.5251 12.8536 24.9393 13.4393L15.3934 22.9853C14.8076 23.5711 14.8076 24.5208 15.3934 25.1066C15.9792 25.6924 16.9289 25.6924 17.5147 25.1066L26 16.6213L34.4853 25.1066C35.0711 25.6924 36.0208 25.6924 36.6066 25.1066C37.1924 24.5208 37.1924 23.5711 36.6066 22.9853L27.0607 13.4393ZM27.5 37.5L27.5 14.5L24.5 14.5L24.5 37.5L27.5 37.5Z" fill="white"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat; 