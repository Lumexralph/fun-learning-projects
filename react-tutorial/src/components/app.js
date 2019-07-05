import React, { Component } from 'react';
import BreakTime from './breakTime';

class PomodoroClock extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return(
      <div>
        <BreakTime />
      </div>
    );
  }
  

}



export default PomodoroClock;