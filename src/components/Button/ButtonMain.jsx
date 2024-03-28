import './ButtonMain.sass';
import React from 'react';

const Button = ({
  title,
  action = Function.prototype,
  size,
  type = 'button',
  color,
  backColor,
  border,
  height,
}) => {
  const style = {
    width: size,
    background: backColor,
    border: border,
    color: color,
    height: height,
  };

  return (
    <button
      className="button-main"
      type={type}
      style={style}
      onClick={action}
    >
      {title}
    </button>
  );
};

export default Button;
