import React from 'react';

const NameInput = ({ value, onChange, placeholder = "Введите имя" }) => {
  const formatName = (input) => {
    // Если строка пустая, возвращаем её как есть
    if (!input) return input;
    
    // Преобразуем первую букву в заглавную, остальные в строчные
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const formatted = formatName(input);
    onChange(formatted);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className="name-input"
      autoComplete="off"
    />
  );
};

export default NameInput; 