import React from 'react';
import ButtonPlus from './buttonPlus';
import ButtonMinus from './buttonMinus';

const BreakTime = (props) => {
  const session = props.session;
  const time = props.time;
  return(
    <div>      
      <ButtonMinus 
        className="time"
        clickHandler={props.negativeHandler}
        session={session} />
      <div className="time">
        <p>{session}</p>
        <p>{time}</p>
      </div>
      <ButtonPlus 
        className="time"
        clickHandler={props.positiveHandler} 
        session={session} />        
    </div>
  );
}

export default BreakTime;