import React from 'react';

const ButtonPlus = (props) => {  
  const clickHandler = props.clickHandler;
  const session = props.session;

  return (
    <input 
        className={session}
        type="button"
        value= "+"
        onClick={(e) => clickHandler(session, e)} />
  );
}

export default ButtonPlus;