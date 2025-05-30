import React from 'react';

const Button = ({ type, texto, onClick, color="blue" }) => {
  return (
    <button
      className={`ui button ${color}`}
      type={type}
      onClick={onClick}
    >
      {texto}
    </button>
  );
};

export default Button; 