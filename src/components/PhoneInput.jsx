import React, { useState } from 'react';

const PhoneInput = ({ value, onChange, placeholder = "Введите номер телефона" }) => {
  const formatPhoneNumber = (input) => {
    // Удаляем все нецифровые символы
    const numbers = input.replace(/\D/g, '');
    
    let formattedNumber = numbers;
    
    // Если номер начинается с 8, заменяем на 7
    if (numbers.startsWith('8')) {
      formattedNumber = '7' + numbers.slice(1);
    }
    
    // Если введено 10 цифр без префикса, добавляем +7
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
    
    return formattedNumber;
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    onChange(formatted);
  };

  return (
    <input
      type="tel"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="phone-input"
      maxLength="18"
    />
  );
};

export default PhoneInput; 