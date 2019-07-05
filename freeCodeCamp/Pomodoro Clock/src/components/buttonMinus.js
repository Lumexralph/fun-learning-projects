import React from 'react';

const ButtonMinus = (props) =>  {
  const clickHandler = props.clickHandler;
  const session = props.session;

  return(
    <input 
        className={session}
        onClick={(e) => clickHandler(session, e)}
        type="button" 
        value="-" />
  );
}

export default ButtonMinus;