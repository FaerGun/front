import React, { useState, useEffect } from 'react';
import '../App.css';


const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListHidden, setIsListHidden] = useState(false);

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

  const toggleList = () => {
    setIsListHidden(!isListHidden);
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        <div className={`chat-list ${isListHidden ? 'hidden' : ''}`}>
          <svg className="chat-list-icon2" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.8173 11.258C19.8173 15.7914 16.0802 19.516 11.4086 19.516C6.73709 19.516 3 15.7914 3 11.258C3 6.72463 6.73709 3 11.4086 3C16.0802 3 19.8173 6.72463 19.8173 11.258ZM17.8232 19.3371C16.0555 20.7022 13.8285 21.516 11.4086 21.516C5.66011 21.516 1 16.9234 1 11.258C1 5.59267 5.66011 1 11.4086 1C17.1572 1 21.8173 5.59267 21.8173 11.258C21.8173 13.8234 20.8618 16.1687 19.2824 17.9674L25.4114 24.0077C25.8048 24.3954 25.8048 25.0239 25.4114 25.4116C25.018 25.7992 24.3803 25.7992 23.9869 25.4116L17.8232 19.3371Z" fill="black"/>
          </svg>
          <svg className='chat-list-icon3' width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="26" height="26" rx="13" fill="#B3DB32"/>
            <path d="M11.6387 19V7H14.3613V19H11.6387ZM7 14.3613V11.6387H19V14.3613H7Z" fill="black"/>
          </svg>
        </div>
        <svg 
          className={`chat-list-icon1 ${isListHidden ? 'rotated' : ''}`} 
          width="30" 
          height="25" 
          viewBox="0 0 30 25" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          onClick={toggleList}
          style={{ cursor: 'pointer' }}
        >
          <path d="M5.45455 6.94444C5.45455 6.17738 6.06507 5.55556 6.81818 5.55556H8.18182C8.93493 5.55556 9.54545 6.17738 9.54545 6.94444V8.33333C9.54545 9.1004 8.93493 9.72222 8.18182 9.72222H6.81818C6.06507 9.72222 5.45455 9.1004 5.45455 8.33333V6.94444Z" fill="black"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0 6.94444C0 3.10913 3.0526 0 6.81818 0H23.1818C26.9474 0 30 3.10913 30 6.94444V18.0556C30 21.8909 26.9474 25 23.1818 25H6.81818C3.0526 25 0 21.8909 0 18.0556V6.94444ZM13.6364 2.77778H23.1818C25.4412 2.77778 27.2727 4.64326 27.2727 6.94444V18.0556C27.2727 20.3567 25.4412 22.2222 23.1818 22.2222H13.6364L13.6364 2.77778ZM10.9091 2.77778H6.81818C4.55884 2.77778 2.72727 4.64326 2.72727 6.94444V18.0556C2.72727 20.3567 4.55884 22.2222 6.81818 22.2222H10.9091L10.9091 2.77778Z" fill="black"/>
        </svg>
        

        <div className={`chat-title ${isListHidden ? 'moved' : ''}`}>
        Собеседование backend-разработчика.
        </div>
        <div className={`chat-messages ${isListHidden ? 'expanded' : ''}`}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
              {message.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className={`chat-input-container ${isListHidden ? 'expanded' : ''}`}>
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