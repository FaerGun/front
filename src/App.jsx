import { useState, useRef, useCallback, useEffect, memo } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import photo from './assets/photo.png'
import Onboarding1 from './pages/onboarding-1'
import Dashboard from './pages/Dashboard'
import PhoneInput from './components/PhoneInput'
import NameInput from './components/NameInput'
import EmailInput from './components/EmailInput'
import { authApi } from './api/auth'

function App() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  // Пример существующих адресов электронной почты
  const existingEmails = ['test@example.com', 'user@example.com'];

  useEffect(() => {
    // Имитация загрузки
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Загрузка длится 2 секунды

    return () => clearTimeout(timer);
  }, []);

  const handleNextClick = () => {
    if (emailInputRef.current && emailInputRef.current.value) {
      const enteredEmail = emailInputRef.current.value;
      setEmail(enteredEmail);
      setError(''); // Очищаем ошибку при вводе

      // Проверяем, существует ли почта
      if (existingEmails.includes(enteredEmail)) {
        setStep(3); // Переход к авторизации
      } else {
        setStep(2); // Переход к регистрации
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && emailInputRef.current && emailInputRef.current.value) {
      handleNextClick();
    }
  };

  const handleRegisterClick = async (formData) => {
    try {
      setError(''); // Очищаем предыдущие ошибки
      
      // Отправляем данные на сервер
      await authApi.register(
        email, // email из состояния компонента
        formData.password,
        formData.name,
        formData.phone
      );
      
      // Если регистрация успешна, показываем overlay
      setUserName(formData.name);
      setShowOverlay(true);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      
      // Убеждаемся, что сообщение об ошибке - строка
      const errorMessage = typeof error.message === 'string' 
        ? error.message 
        : JSON.stringify(error.message);
      
      // Проверяем статус ошибки
      if (error.status === 409 || errorMessage.includes("Email already registered")) {
        // Если почта уже зарегистрирована, переходим к авторизации
        setEmail(email); // Убеждаемся, что email установлен
        setStep(3); // Переход к авторизации
        setError('Этот email уже зарегистрирован. Пожалуйста, войдите в систему.');
      } else {
        setError(errorMessage || 'Произошла ошибка при регистрации');
      }
    }
  };

  const handleAuthorizeClick = async (formData) => {
    try {
      setError(''); // Очищаем предыдущие ошибки
      
      // Отправляем данные на сервер
      const response = await authApi.login(formData.email, formData.password);
      
      // Если авторизация успешна, показываем overlay
      setUserName(formData.email.split('@')[0]); // Берем имя из email до @
      setShowOverlay(true);
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      
      // Убеждаемся, что сообщение об ошибке - строка
      const errorMessage = typeof error.message === 'string' 
        ? error.message 
        : JSON.stringify(error.message);
      
      // Проверяем статус ошибки
      if (error.status === 401) {
        setError('Неверный email или пароль');
      } else {
        setError(errorMessage || 'Произошла ошибка при авторизации');
      }
    }
  };

  const closeOverlay = () => {
    setTimeout(() => {
        setShowOverlay(false);
    }, 500);
  };

  const Overlay = ({ isVisible, userName }) => {
    const handleButtonClick = () => {
      navigate('/onboarding-1');
    };

    return (
      <div className={`overlay ${isVisible ? 'show' : ''}`}>
        <div className="content-wrapper">
          <h2>ДОБРО ПОЖАЛОВАТЬ НА VIEWTRAIN</h2>
          <p>Вперед к офферу, {userName}!</p>
          <button onClick={handleButtonClick}>К выбору языков и направлений</button>
        </div>
      </div>
    );
  };

  const EmailStep = () => {
    const [hasInput, setHasInput] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [localEmail, setLocalEmail] = useState('');
    
    const handleEmailChange = (value) => {
      setLocalEmail(value);
      setHasInput(value.length > 0);
      // Регулярное выражение для проверки email на английском языке
      const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      setIsValid(emailRegex.test(value));
      setError(''); // Очищаем ошибку при вводе
    };
    
    const handleNextButtonClick = () => {
      if (!isValid) {
        setError('Введите корректный email на английском языке');
        return;
      }
      setEmail(localEmail); // Устанавливаем email в родительском компоненте
      setStep(2); // Всегда переходим к регистрации сначала
    };
    
    return (
      <>
        <h1>Тренируйся.<br/>Анализируй.<br/>Побеждай!</h1>
        <div className="programming-model"></div>
        <div className="frame-5">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="email">
            <EmailInput 
              value={localEmail}
              onChange={handleEmailChange}
              placeholder="Электронная почта"
            />
          </div>
          <div 
            className={`button-next ${isValid ? 'active' : ''}`}
            onClick={handleNextButtonClick}
          >
            <span>Далее</span>
          </div>
          <div className="terms">
            Регистрируясь, вы подтверждаете, что согласны с нашими <u>Условиями использования</u> и <u>Политикой конфиденциальности</u>.
          </div>
        </div>
      </>
    );
  };

  const RegistrationStep = () => {
    const [formData, setFormData] = useState({
      name: '',
      phone: '',
      password: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    
    useEffect(() => {
      const isValid = formData.name.trim() !== '' && 
                     formData.phone.trim() !== '' && 
                     formData.password.trim() !== '';
      setIsFormValid(isValid);
    }, [formData]);

    const handleInputChange = (field) => (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
      setError(''); // Очищаем ошибку при вводе
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && isFormValid) {
        handleRegisterClick(formData);
      }
    };

    return (
      <>
        <div className='registration'><h1>Регистрация</h1></div>
        <div className="registration-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className='strokes'>
            <div className="input-field">
              <NameInput
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                placeholder="Имя"
              />
            </div>
            <div className="input-field">
              <PhoneInput
                value={formData.phone}
                onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                placeholder="Номер телефона"
              />
            </div>
            <div className="input-field">
              <input 
                type="password" 
                placeholder="Пароль*" 
                value={formData.password}
                onChange={handleInputChange('password')}
                onKeyPress={handleKeyPress}
                id="password"
                name="password"
                autoComplete="off"
              />
            </div>
            <div className="password-hint">
              *Ваш пароль должен содержать символы верхнего и нижнего регистров, а так же цифры.
            </div>
          </div>
          <div 
            className={`register-button ${isFormValid ? 'active' : ''}`} 
            onClick={() => isFormValid && handleRegisterClick(formData)}
          >
            <span>Зарегистрироваться</span>
          </div>
          <div className="terms">
            Регистрируясь, вы подтверждаете, что согласны с нашими <u>Условиями использования</u> и <u>Политикой конфиденциальности</u>.
          </div>
        </div>
      </>
    );
  };

  const AuthorizationStep = () => {
    const [formData, setFormData] = useState({
      email: email,
      password: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    
    useEffect(() => {
      const isValid = formData.email.trim() !== '' && 
                     formData.password.trim() !== '';
      setIsFormValid(isValid);
    }, [formData]);

    useEffect(() => {
      setFormData(prev => ({
        ...prev,
        email: email
      }));
    }, [email]);

    const handleInputChange = (field) => (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
      setError(''); // Очищаем ошибку при вводе
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && isFormValid) {
        handleAuthorizeClick(formData);
      }
    };

    return (
      <>
        <div className='authorization1'><h1>Авторизация</h1></div>
        <div className="authorization-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className='strokes'>
            <div className="input-field">
              <input 
                type="email" 
                placeholder="Электронная почта" 
                value={formData.email}
                onChange={handleInputChange('email')}
                onKeyPress={handleKeyPress}
                id="auth-email"
                name="auth-email"
                autoComplete="off"
              />
            </div>
            <div className="input-field">
              <input 
                type="password" 
                placeholder="Пароль" 
                value={formData.password}
                onChange={handleInputChange('password')}
                onKeyPress={handleKeyPress}
                id="auth-password"
                name="auth-password"
                autoComplete="off"
              />
            </div>
          </div>
          <div 
            className={`authorize-button ${isFormValid ? 'active' : ''}`} 
            onClick={() => isFormValid && handleAuthorizeClick(formData)}
          >
            <span>Войти</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="app">
          {isLoading ? (
            <div className="loading-screen">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              {step === 1 && <EmailStep />}
              {step === 2 && <RegistrationStep />}
              {step === 3 && <AuthorizationStep />}
              <Overlay isVisible={showOverlay} userName={userName} />
            </>
          )}
        </div>
      } />
      <Route path="/onboarding-1" element={<Onboarding1 />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
