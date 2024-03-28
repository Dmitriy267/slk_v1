import './ButtonU.sass';
import React from 'react';

const ButtonU = ({
  title,
  action = Function.prototype,
  size,
  type = 'button',
  color,
  backColor,
  height,
  border,
  padding
}) => {
  const style = {
    width: size,
    background: backColor,
    color: color,
    height: height,
    border: border,
    padding
  };

  return (
    <button className="buttonu-main" type={type} style={style} onClick={action} border={border}>
      {title}
    </button>
  );
};

export default ButtonU;
