//USING OOP TO BUILD TIMER
"use strict";
//let timerRunning = false;    //to know when the timer is running or not

function mainTime(time, id) {
	let session = "work";
	let timeInterval;
	//let startingTime = sessionTime
	this.id = id;
	let breakTime = 5;
	let workTime = 25;
	let startingTime = workTime;

	this.time = startingTime;
	//allows to set a new time
	this.setTime = (objWork, objBreak) => { 
		//startingTime = objectTime;
		workTime = objWork.time;
		breakTime = objBreak.time
	console.log(startingTime);
	 };
	
	this.count = () => {

		this.display(this.id);
		console.log(this.getSession(), this.time);
		console.log(workTime, breakTime);

		if(this.time === 0 && this.getSession() === "work") {
			this.time = this.getBreakTime();
			this.setSession("break");

		}

		else if(this.time === 0 && this.getSession() === "break") {
			this.setSession("work");
			this.time = this.getWorkTime();
		}
		this.time--;  //decrease the time

	}

	//start countdown
	this.startCount = (objWork, objBreak) => {
		objWork.setSession(true);
		objBreak.setSession(true);
		this.setBreakTime(objBreak);
		this.setWorkTime(objWork);
		if (this.getSession() === "work" && this.time === 0) {
			this.time = this.getWorkTime();
		}
		else if (this.getSession() === "work" && this.time !== 0) {
			this.time = this.getWorkTime();
		}
		else if(this.time === 0) {
			this.time = this.getBreakTime();
		}
		//timerRunning = true;
		timeInterval = setInterval(this.count, 1000);
	}
	//stop/pause the time
	this.stopCount = (objWork, objBreak) => {
		objWork.setSession(false);
		objBreak.setSession(false);
		clearInterval(timeInterval)
		 };
	//reset the time
	this.reset = (objWork, objBreak, id) => { 
		objWork.setSession(false);
		objBreak.setSession(false);
		this.stopCount(objWork, objBreak);
		this.time = startingTime;
		this.display(id);
		 }
	//displayon DOM
	this.display = (id) => {
		document.getElementById(id).textContent = this.time;
	}

	this.getSession = () => session;

	this.setSession = (status) => { session = status};

	this.setBreakTime = (obj) => {
		breakTime = obj.time;
	};

	this.setWorkTime = (obj) => {
		workTime = obj.time;
	};

	this.getBreakTime = () => breakTime;

	this.getWorkTime = () => workTime;

	//takes the session and break


}

//class to create break and work session
function Session(time, id) {
	var inSession = false;  //keep track of time
	this.id = id;
	this.time = time;

	this.increment = () => { console.log(this.time);
		if(this.getSession()) return;
		this.time++;
		this.update();
		 };
	this.decrement = () => { console.log(this.time);
		//if time is 0 do nothing and if session is running
		if(this.getSession()) return;
		if(this.time === 0) return;
		this.time--;
		this.update();
		 };
	this.update = () => { 
		document.getElementById(this.id).textContent = this.time;
	} 

	this.setSession = (bool) => {
		inSession = bool;
		}
	this.getSession = () => inSession;
}


//main time
let time = new mainTime(30, "main");
//session time
let workTime = new Session(25, "work");
let breakTime = new Session(5, "break");

let sessionButtons = document.querySelectorAll('.timerButton');

//ADD EVENT LISTENERS
//make the session running
sessionButtons[0]
				.addEventListener("click",
				 () => { time.startCount(workTime, breakTime)});

//stop/pause the session
sessionButtons[1]
				.addEventListener("click",
				 () => { time.stopCount(workTime, breakTime)});

//reset the session
sessionButtons[2]
				.addEventListener("click",
				 () => { time.reset(workTime, breakTime, "main")});

//BREAK TIMER
let decrementBreak = document.getElementById('decreaseBreak');
let incrementBreak = document.getElementById('increaseBreak');

//decrease break time
decrementBreak.addEventListener("click", breakTime.decrement);
//increase work time
incrementBreak.addEventListener("click", breakTime.increment);

//WORK TIMER
let decrementWork = document.getElementById('decreaseWork');
let incrementWork = document.getElementById('increaseWork');

//decrease break time
decrementWork.addEventListener("click", workTime.decrement);
//increase work time
//incrementWork.addEventListener("click", workTime.increment);

