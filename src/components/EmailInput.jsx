import React, { useState } from 'react';

const EmailInput = ({ value, onChange, placeholder = "Введите email" }) => {
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    // Регулярное выражение для проверки email на английском языке
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    
    if (!email) {
      setError('');
      return true;
    }

    if (!emailRegex.test(email)) {
      setError('Введите корректный email на английском языке');
      return false;
    }

    setError('');
    return true;
  };

  const handleChange = (e) => {
    const input = e.target.value;
    // Запрещаем ввод кириллицы
    const latinOnly = input.replace(/[^a-zA-Z0-9@._+-]/g, '');
    
    validateEmail(latinOnly);
    onChange(latinOnly);
  };

  return (
    <div className="email-input-container">
      <input
        type="email"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`email-input ${error ? 'error' : ''}`}
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default EmailInput; 