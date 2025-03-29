import React, { useState } from 'react';

const PhoneInput = ({ value, onChange, placeholder = "Введите номер телефона" }) => {
  const [error, setError] = useState('');

  const formatPhoneNumber = (input) => {
    // Удаляем все нецифровые символы
    const numbers = input.replace(/\D/g, '');
    
    // Проверяем длину номера
    if (numbers.length > 11) {
      setError('Номер телефона не может содержать больше 11 цифр');
      return value; // Возвращаем предыдущее значение
    }
    
    let formattedNumber = numbers;
    
    // Если номер начинается с 8, заменяем на 7
    if (numbers.startsWith('8')) {
      formattedNumber = '7' + numbers.slice(1);
    }
    
    // Если введено 10 цифр без префикса, добавляем 7
    if (formattedNumber.length === 10 && !formattedNumber.startsWith('7')) {
      formattedNumber = '7' + formattedNumber;
    }
    
    // Добавляем + если номер начинается с 7
    if (formattedNumber.startsWith('7')) {
      formattedNumber = '+' + formattedNumber;
    }
    
    // Форматируем номер в формате +7(XXX)XXX-XX-XX
    if (formattedNumber.length > 0) {
      formattedNumber = formattedNumber.replace(/^\+7/, '+7(');
      if (formattedNumber.length > 6) {
        formattedNumber = formattedNumber.slice(0, 6) + ')' + formattedNumber.slice(6);
      }
      if (formattedNumber.length > 10) {
        formattedNumber = formattedNumber.slice(0, 10) + '-' + formattedNumber.slice(10);
      }
      if (formattedNumber.length > 13) {
        formattedNumber = formattedNumber.slice(0, 13) + '-' + formattedNumber.slice(13);
      }
    }

    // Очищаем ошибку если номер валидный
    if (formattedNumber.replace(/\D/g, '').length >= 11) {
      setError('');
    } else if (formattedNumber.length > 0) {
      setError('Введите полный номер телефона');
    }
    
    return formattedNumber;
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    onChange(formatted);
  };

  return (
    <div className="phone-input-container">
      <input
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`phone-input ${error ? 'error' : ''}`}
        maxLength="18"
      />
      {error && <div className="input-error">{error}</div>}
    </div>
  );
};

export default PhoneInput; 