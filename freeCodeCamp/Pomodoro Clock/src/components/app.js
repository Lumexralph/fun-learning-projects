import React, { Component } from 'react';

import Time from './setTimeDisplay';
import Footer from './footer';


class PomodoroClock extends Component {
  constructor(props) {
    super(props);
    this.increaseTime = this.increaseTime.bind(this);
    this.decreaseTime = this.decreaseTime.bind(this);
    this.countdown = this.countdown.bind(this);
    this.timerID = null;
    this.workStatus = '';
    this.status = null;
    this.buttonPressed = false;

    this.state = {
      breakTime: 5,
      sessionTime: 25,
      timer: 0,
    };    
  }

  timerFuntionality() {
    if (this.status === null) {
      this.start();
    } else if (this.status === 'start') {
      this.pause();
    } else if(this.status === 'pause' && !this.buttonPressed) {
      this.resume();
    } else if(this.status === 'pause' && this.buttonPressed) {
      this.reset();
    }
  }

  // start the countdown
  countdown() {
    if (this.state.timer === 0 && this.workStatus === 'work') {
      this.setState({ timer: this.state.breakTime * 60 });
      this.workStatus = 'break';
    }
    else if (this.state.timer === 0 && this.workStatus === 'break') {
      this.setState({ timer: this.state.sessionTime * 60 });
      this.workStatus = 'work';
    }

    this.setState({timer: this.state.timer - 1});
  }
  //start the timer
  start() {
    this.setState({ 
      timer: this.state.sessionTime * 60,
     });

    this.status ='start';
    this.workStatus = 'work';
    this.timerID = setInterval(this.countdown, 1000);      
  }

  pause() {
   clearInterval(this.timerID);
   this.setState({ timer: this.state.timer });    
   this.buttonPressed = false;
   this.status = 'pause';    
  }

  resume() {
    this.timerID = setInterval(this.countdown, 1000);
    this.status = 'start';
  }

  reset() {
    // stop the timer to start another process
    clearInterval(this.timerID);
    this.status = null;
    this.start();  
  }

  increaseTime(session, e) {
    //if timer has started counting disable the button
    if (this.status === 'start') return;

    session === 'break' ? this.setState({ breakTime: this.state.breakTime + 1})
                       : this.setState({ sessionTime: this.state.sessionTime + 1 });
    // button was pressed
    this.buttonPressed = true;
  }

  decreaseTime(session, e) {
    //if timer has started counting
    // disable
    if (this.status === 'start') return;

    const time = session === 'break' ?  this.state.breakTime :            this.state.sessionTime;

    // don't allow time go beyond 0
    if (session === 'break') {
      time ? this.setState({ breakTime: this.state.breakTime - 1})
           : this.setState({ breakTime: 0 });
    } else if (session === 'work') {
      time ? this.setState({ sessionTime: this.state.sessionTime - 1})
           : this.setState({ sessionTime: 0 });
    }     
    // button was pressed
    this.buttonPressed = true;
  }

  formatTime(time){
    let s = Number(time);
    return(s-(s%=60))/60+(9<s?':':':0')+s;
  };

  render() {
    const workStatus = this.workStatus.substr(0, 1);
    return(
      <div> 
        <h1 className="text-center">Pomodoro FCC</h1>
        <div className="row pomodoro">
          <div className="breakTime col-sm-3">
            <Time 
              session="break"
              time={this.state.breakTime}
              positiveHandler={this.increaseTime}
              negativeHandler={this.decreaseTime} />
          </div>  
                      
          <div className="timer col-sm-6">
            <div 
              className="outerTimer"
              onClick={() => this.timerFuntionality()}>
              <div className="innerTimer">                
                <h1
                  className={workStatus === 'w' ? "workColour" : "breakColour"}>
                  { this.formatTime(this.state.timer) }
                </h1>
              </div>
            </div>
          </div>

          <div className="workTime col-sm-3">
            <Time 
              session="work"
              time={this.state.sessionTime}
              positiveHandler={this.increaseTime} 
              negativeHandler={this.decreaseTime} />
          </div>

        </div>

        {/* footer */}
        <div className="row footer">
          <Footer />
        </div>  
        
      </div>
    );
  }  

}

export default PomodoroClock;