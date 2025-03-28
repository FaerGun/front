import { useState, useRef, useCallback, useEffect, memo } from 'react'
import './App.css'

function App() {
  const [step, setStep] = useState(1);
  const emailInputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [showOverlay, setShowOverlay] = useState(false);
  
  // Пример существующих адресов электронной почты
  const existingEmails = ['test@example.com', 'user@example.com'];

  const handleNextClick = () => {
    if (emailInputRef.current && emailInputRef.current.value) {
      const enteredEmail = emailInputRef.current.value;
      setEmail(enteredEmail); // Сохраняем введенную почту

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

  const handleRegisterClick = (formData) => {
    console.log("Регистрация успешна, показываем overlay");
    setShowOverlay(true);
  };

  const handleAuthorizeClick = () => {
    console.log("Авторизация успешна");
  };

  const closeOverlay = () => {
    setTimeout(() => {
        setShowOverlay(false);
    }, 500);
  };

  const Overlay = () => (
    <div className={`overlay ${showOverlay ? 'show' : ''}`}>
      <h2>Регистрация успешна!</h2>
      <p>Добро пожаловать в ViewTrain!</p>
      <button onClick={closeOverlay}>Закрыть</button>
    </div>
  );

  const EmailStep = () => {
    const [hasInput, setHasInput] = useState(false);
    
    const handleInputChange = (e) => {
      setHasInput(e.target.value.length > 0);
    };
    
    return (
      <>
        <h1>Тренируйся.<br/>Анализируй.<br/>Побеждай!</h1>
        <div className="programming-model"></div>
        <div className="frame-5">
          <div className="email">
            <input 
              ref={emailInputRef}
              type="email" 
              placeholder="Электронная почта" 
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              id="email"
              name="email"
            />
          </div>
          <div 
            className={`button-next ${hasInput ? 'active' : ''}`}
            onClick={handleNextClick}
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
      setIsFormValid(!!(formData.name && formData.phone && formData.password));
    }, [formData]);

    const handleInputChange = (field) => (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };

    return (
      <>
        <div className='registration'><h1>Регистрация</h1></div>
        <div className="registration-form">
          <div className='strokes'>
            <div className="input-field">
              <input 
                type="text" 
                placeholder="Имя" 
                value={formData.name}
                onChange={handleInputChange('name')}
                id="name"
                name="name"
                autoComplete="off"
              />
            </div>
            <div className="input-field">
              <input 
                type="tel" 
                placeholder="Номер телефона" 
                value={formData.phone}
                onChange={handleInputChange('phone')}
                id="phone"
                name="phone"
                autoComplete="off"
              />
            </div>
            <div className="input-field">
              <input 
                type="password" 
                placeholder="Пароль*" 
                value={formData.password}
                onChange={handleInputChange('password')}
                id="password"
                name="password"
                autoComplete="off"
              />
            </div>
            <div className="password-hint">
              *Ваш пароль должен содержать символы верхнего и нижнего регистров, а так же цифры.
            </div>
          </div>
          <div className={`register-button ${isFormValid ? 'active' : ''}`} onClick={() => handleRegisterClick(formData)}>
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
      email: '',
      password: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    
    useEffect(() => {
      setIsFormValid(!!(formData.email && formData.password));
    }, [formData]);

    const handleInputChange = (field) => (e) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }));
    };

    return (
      <>
        <div className='authorization'><h1>Авторизация</h1></div>
        <div className="authorization-form">
          <div className='strokes'>
            <div className="input-field">
              <input 
                type="email" 
                placeholder="Электронная почта" 
                value={formData.email}
                onChange={handleInputChange('email')}
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
                id="auth-password"
                name="auth-password"
                autoComplete="off"
              />
            </div>
          </div>
          <div className={`authorize-button ${isFormValid ? 'active' : ''}`} onClick={handleAuthorizeClick}>
            <span>Войти</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="background">
        <div className="logo">
          <svg width="191" height="26" viewBox="0 0 191 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1012 7.45057L12.5006 25.6446H6.60062L0 7.45057H5.53125L9.45228 20.4683H9.64895L13.5577 7.45057H19.1012Z" fill="black"/>
            <path d="M20.3963 25.6446V7.45057H25.6325V25.6446H20.3963ZM23.0267 5.10524C22.2482 5.10524 21.5804 4.85649 21.0232 4.359C20.4741 3.85361 20.1996 3.24951 20.1996 2.5467C20.1996 1.85178 20.4741 1.25558 21.0232 0.758088C21.5804 0.252696 22.2482 0 23.0267 0C23.8052 0 24.4689 0.252696 25.0179 0.758088C25.5752 1.25558 25.8538 1.85178 25.8538 2.5467C25.8538 3.24951 25.5752 3.85361 25.0179 4.359C24.4689 4.85649 23.8052 5.10524 23.0267 5.10524Z" fill="black"/>
            <path d="M37.0467 26C35.1046 26 33.4329 25.621 32.0317 24.8629C30.6386 24.0969 29.5652 23.015 28.8113 21.6173C28.0574 20.2117 27.6804 18.5494 27.6804 16.6305C27.6804 14.759 28.0574 13.1165 28.8113 11.703C29.5652 10.2894 30.6263 9.18785 31.9948 8.39818C33.3715 7.6085 34.9858 7.21367 36.8377 7.21367C38.0833 7.21367 39.2428 7.40714 40.3163 7.79408C41.3979 8.17312 42.3403 8.74563 43.1433 9.51162C43.9546 10.2776 44.5856 11.241 45.0363 12.4018C45.4869 13.5547 45.7123 14.9051 45.7123 16.4528V17.8387H29.77V14.7116H40.7833C40.7833 13.9851 40.6195 13.3415 40.2917 12.7809C39.9639 12.2202 39.5091 11.7819 38.9273 11.4661C38.3537 11.1423 37.6858 10.9804 36.9238 10.9804C36.1289 10.9804 35.4242 11.1581 34.8096 11.5134C34.2032 11.8609 33.7279 12.3308 33.3838 12.923C33.0396 13.5074 32.8634 14.1588 32.8552 14.8774V17.8506C32.8552 18.7508 33.0273 19.5286 33.3715 20.1841C33.7238 20.8395 34.2196 21.3449 34.8588 21.7002C35.4979 22.0556 36.2559 22.2333 37.1327 22.2333C37.7145 22.2333 38.2472 22.1543 38.7306 21.9964C39.2141 21.8384 39.6279 21.6015 39.9721 21.2857C40.3163 20.9698 40.5785 20.5828 40.7588 20.1248L45.6017 20.4328C45.3558 21.5541 44.8519 22.5333 44.0898 23.3704C43.3359 24.1995 42.3608 24.8471 41.1644 25.313C39.9762 25.771 38.6036 26 37.0467 26Z" fill="black"/>
            <path d="M51.334 25.6446L46.1961 7.45057H51.4938L54.4192 19.6747H54.5913L57.6396 7.45057H62.839L65.9365 19.6036H66.0963L68.9725 7.45057H74.2579L69.1323 25.6446H63.5888L60.3438 14.2023H60.1103L56.8653 25.6446H51.334Z" fill="black"/>
            <path d="M87.4453 7.45057V11.241H76.0756V7.45057H87.4453ZM78.6568 3.09157H83.8931V20.0538C83.8931 20.5197 83.9668 20.8829 84.1143 21.1435C84.2618 21.3962 84.4667 21.5739 84.7289 21.6765C84.9993 21.7792 85.3107 21.8305 85.663 21.8305C85.9089 21.8305 86.1547 21.8108 86.4006 21.7713C86.6464 21.7239 86.8349 21.6884 86.966 21.6647L87.7895 25.4196C87.5273 25.4986 87.1585 25.5894 86.6833 25.692C86.208 25.8026 85.6303 25.8697 84.9501 25.8934C83.6882 25.9408 82.5819 25.7789 81.6314 25.4077C80.689 25.0366 79.9556 24.4601 79.4312 23.6784C78.9067 22.8966 78.6486 21.9095 78.6568 20.7171V3.09157Z" fill="black"/>
            <path d="M89.4717 25.6446V7.45057H94.5482V10.6251H94.7449C95.089 9.49582 95.6667 8.64298 96.478 8.06652C97.2892 7.48216 98.2234 7.18998 99.2805 7.18998C99.5427 7.18998 99.8254 7.20577 100.129 7.23736C100.432 7.26895 100.698 7.31238 100.928 7.36765V11.8451C100.682 11.774 100.342 11.7109 99.9074 11.6556C99.4731 11.6003 99.0756 11.5727 98.7151 11.5727C97.9448 11.5727 97.2565 11.7345 96.6501 12.0583C96.0519 12.3742 95.5766 12.8164 95.2242 13.385C94.8801 13.9535 94.708 14.609 94.708 15.3513V25.6446H89.4717Z" fill="black"/>
            <path d="M107.093 25.9882C105.889 25.9882 104.815 25.7868 103.873 25.3841C102.93 24.9734 102.185 24.3693 101.636 23.5718C101.095 22.7663 100.824 21.7634 100.824 20.5631C100.824 19.5523 101.017 18.7034 101.402 18.0164C101.787 17.3294 102.312 16.7766 102.975 16.3581C103.639 15.9396 104.393 15.6237 105.237 15.4105C106.089 15.1973 106.983 15.0472 107.917 14.9604C109.015 14.8498 109.9 14.7472 110.572 14.6524C111.244 14.5497 111.731 14.3997 112.034 14.2023C112.338 14.0049 112.489 13.7127 112.489 13.3257V13.2547C112.489 12.5045 112.243 11.9241 111.752 11.5134C111.268 11.1028 110.58 10.8975 109.687 10.8975C108.744 10.8975 107.995 11.0989 107.437 11.5016C106.88 11.8964 106.511 12.3939 106.331 12.9941L101.488 12.615C101.734 11.5095 102.217 10.554 102.939 9.74852C103.66 8.93515 104.59 8.31131 105.729 7.87699C106.876 7.43478 108.204 7.21367 109.711 7.21367C110.76 7.21367 111.764 7.33212 112.723 7.56902C113.69 7.80592 114.546 8.17312 115.292 8.67062C116.046 9.16811 116.64 9.80775 117.074 10.5895C117.508 11.3634 117.725 12.2913 117.725 13.3731V25.6446H112.76V23.1216H112.612C112.309 23.6902 111.903 24.1916 111.395 24.626C110.887 25.0524 110.277 25.388 109.564 25.6328C108.851 25.8697 108.027 25.9882 107.093 25.9882ZM108.593 22.5057C109.363 22.5057 110.043 22.3596 110.633 22.0674C111.223 21.7674 111.686 21.3646 112.022 20.8592C112.358 20.3538 112.526 19.7813 112.526 19.1417V17.2109C112.362 17.3136 112.137 17.4084 111.85 17.4952C111.571 17.5742 111.256 17.6492 110.904 17.7203C110.551 17.7834 110.199 17.8427 109.847 17.898C109.494 17.9453 109.175 17.9888 108.888 18.0282C108.273 18.1151 107.736 18.2533 107.278 18.4428C106.819 18.6323 106.462 18.889 106.208 19.2128C105.954 19.5286 105.827 19.9235 105.827 20.3973C105.827 21.0843 106.085 21.6094 106.602 21.9727C107.126 22.328 107.79 22.5057 108.593 22.5057Z" fill="black"/>
            <path d="M120.403 25.6446V7.45057H125.64V25.6446H120.403ZM123.034 5.10524C122.255 5.10524 121.587 4.85649 121.03 4.359C120.481 3.85361 120.207 3.24951 120.207 2.5467C120.207 1.85178 120.481 1.25558 121.03 0.758088C121.587 0.252696 122.255 0 123.034 0C123.812 0 124.476 0.252696 125.025 0.758088C125.582 1.25558 125.861 1.85178 125.861 2.5467C125.861 3.24951 125.582 3.85361 125.025 4.359C124.476 4.85649 123.812 5.10524 123.034 5.10524Z" fill="black"/>
            <path d="M133.686 15.1262V25.6446H128.45V7.45057H133.44V10.6606H133.661C134.079 9.60243 134.78 8.76538 135.763 8.14943C136.746 7.52559 137.939 7.21367 139.34 7.21367C140.651 7.21367 141.794 7.49006 142.769 8.04283C143.744 8.5956 144.502 9.38527 145.043 10.4118C145.584 11.4305 145.855 12.6466 145.855 14.0601V25.6446H140.618V14.9604C140.626 13.8469 140.331 12.9783 139.733 12.3544C139.135 11.7227 138.312 11.4068 137.263 11.4068C136.558 11.4068 135.935 11.5529 135.394 11.8451C134.862 12.1373 134.444 12.5637 134.141 13.1244C133.846 13.6771 133.694 14.3444 133.686 15.1262Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M163.652 16.4667L154.536 6.93333V26L163.652 16.4667ZM172.768 16.4667L163.652 6.93333V16.4667V26L172.768 16.4667ZM181.884 16.4667L172.768 6.93333V16.4667V26L181.884 16.4667ZM181.884 16.4667V6.93333L191 16.4667L181.884 26V16.4667Z" fill="#B4DB32"/>
          </svg>
        </div>
        <div className="container1">
          <h1>От тренировки – к офферу</h1>
          <p>Пройдите реалистичные интервью с искусственным интеллектом, <br/>получите аналитику ответов и улучшие свои навыки</p>
        </div>
        <div className="container2">

        </div>
        <div className="container3">
          <h1>Прокачивай навыки во <br/>множестве языков</h1>
          <p className="Python">Python</p>
          <p className="JavaScript">JavaScript</p>
          <p className="Cplusplus">C++</p>
          <p className="Java">Java</p>
          <p className="Go">Go</p>
          <p className="Csharp">C#</p>
          <div className="languages">
            
          </div>
        </div>
        <div className='authorization'>
          {step === 1 ? <EmailStep /> : step === 2 ? <RegistrationStep /> : <AuthorizationStep />}
        </div>
        {showOverlay && <Overlay />}
      </div>
    </>
  )
}

export default App
