import React, { useState, useEffect } from 'react';
import './ChatInterview.css';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = '/api/v1';

const ChatInterview = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListHidden, setIsListHidden] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [interviewStatus, setInterviewStatus] = useState('not_started');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('chat-open');
    setShowElements(true);
    return () => {
      document.body.classList.remove('chat-open');
    };
  }, []);

  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'X-API-Key': 'interview',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    };
  };

  const startInterview = async () => {
    try {
      console.log('Начинаем интервью - отправляем запрос...');
      const headers = getAuthHeaders();
      console.log('Заголовки для запроса:', headers);
      
      const response = await fetch(`${API_BASE_URL}/interview/start`, {
        method: 'GET',
        headers: headers,
        credentials: 'include'
      });

      console.log('Статус ответа:', response.status);
      console.log('Заголовки ответа:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        if (response.status === 401) {
          const errorData = await response.json();
          console.error('Ошибка авторизации:', errorData);
          throw new Error(errorData.detail || 'Токен истек');
        }
        throw new Error('Ошибка при запуске интервью');
      }

      const data = await response.json();
      console.log('Получены данные:', data);
      
      setInterviewStatus('ongoing');
      setIsInterviewStarted(true);
      setMessages(prev => [...prev, {
        text: 'Интервью начато. Давайте начнем с первого вопроса.',
        isBot: true,
        timestamp: new Date()
      }]);
      await getNextQuestion();
    } catch (error) {
      console.error('Ошибка при запуске интервью:', error);
      console.error('Полная информация об ошибке:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      setMessages(prev => [...prev, {
        text: error.message || 'Произошла ошибка при запуске интервью. Пожалуйста, попробуйте позже.',
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  const getNextQuestion = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/interview/question`, {
        method: 'GET',
        headers: getAuthHeaders(),
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Токен истек');
        }
        throw new Error('Ошибка при получении вопроса');
      }

      const data = await response.json();
      setCurrentQuestionId(data.question_id);
      setMessages(prev => [...prev, {
        text: data.question_text,
        isBot: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Ошибка:', error);
      setMessages(prev => [...prev, {
        text: error.message || 'Произошла ошибка при получении вопроса. Пожалуйста, попробуйте позже.',
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  const submitAnswer = async (answer) => {
    if (!currentQuestionId) return;

    try {
      const response = await fetch(`${API_BASE_URL}/interview/answer`, {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include',
        body: JSON.stringify({
          question_id: currentQuestionId,
          user_answer: answer
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Токен истек');
        }
        throw new Error('Ошибка при отправке ответа');
      }

      const data = await response.json();
      
      // Добавляем ответ пользователя
      setMessages(prev => [...prev, {
        text: answer,
        isBot: false,
        timestamp: new Date()
      }]);

      // Добавляем обратную связь
      setMessages(prev => [...prev, {
        text: `Оценка: ${data.score}\nОбратная связь: ${data.feedback}`,
        isBot: true,
        timestamp: new Date()
      }]);

      if (data.interview_completed) {
        setInterviewStatus('completed');
        setMessages(prev => [...prev, {
          text: `Интервью завершено!\nИтоговая оценка: ${data.final_score}%\n${data.final_feedback}`,
          isBot: true,
          timestamp: new Date()
        }]);
      } else {
        await getNextQuestion();
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setMessages(prev => [...prev, {
        text: error.message || 'Произошла ошибка при отправке ответа. Пожалуйста, попробуйте позже.',
        isBot: true,
        timestamp: new Date()
      }]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const message = inputMessage.trim();
    setInputMessage('');

    if (!isInterviewStarted) {
      if (message.toLowerCase() === '/start') {
        await startInterview();
      } else {
        setMessages(prev => [...prev, {
          text: 'Для начала интервью введите команду /start',
          isBot: true,
          timestamp: new Date()
        }]);
      }
    } else {
      await submitAnswer(message);
    }
  };

  const toggleList = () => {
    setIsListHidden(!isListHidden);
  };

  const handleDashboardClick = () => {
    navigate('/statistics');
  };

  return (
    <div className="chat-interview">
      <div className="chat-container">
        <div className={`logo ${showElements ? 'show' : ''}`}>
          {/* ... existing logo SVG ... */}
        </div>
        <div className={`dashboard ${showElements ? 'show' : ''}`} onClick={handleDashboardClick}>
          {/* ... existing dashboard SVG ... */}
        </div>
        <div className={`profile ${showElements ? 'show' : ''}`}>
          {/* ... existing profile SVG ... */}
        </div>
        <div className={`chat ${showElements ? 'show' : ''}`}>
          {/* ... existing chat SVG ... */}
        </div>
        <div className="chat-main">
          <div className={`chat-list ${isListHidden ? 'hidden' : ''}`}>
            <div className="chat-active">
              <div className="chat-active-title">
                Собеседование backend-разработчика
              </div>
              <div className="chat-active-description">
                {messages.length} сообщений
              </div>
            </div>
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
            {/* ... existing icon SVG ... */}
          </svg>

          <div className={`chat-title ${isListHidden ? 'moved' : ''}`}>
            Собеседование backend-разработчика
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
              placeholder={!isInterviewStarted ? "Введите /start для начала интервью" : "Введите ваш ответ..."}
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
    </div>
  );
};

export default ChatInterview; 