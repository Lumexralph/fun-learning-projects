const hrRespond = true;

const applyForLeave = new Promise(
      (resolve, reject) => {
        if (hrRespond) { // when hr responds
          const leaveDetails = {
            startDate: 'Monday',
            endDate: 'Tuesday'
          };
          resolve(leaveDetails);
        } else { // if hr chooses to misbehave as usual
          const error = new Error('The HR refuses to grant the application');
          reject(error);
        }
      }
  );
  
  // explain to Nike about the result
  const explainToNike = (value) => 
        new Promise(resolve => resolve(value));
  
  // consume the promise result
  const doLeave = () => {
        applyForLeave
              .then(explainToNike)
              .then(fulfilled => console.log(`Start date: ${fulfilled.startDate} End date: ${fulfilled.endDate}`))
              .catch(error => console.log(error));
  };
  
// start the process
doLeave();


// USING aync and await
const hrRespond = true;

const applyForLeave = new Promise(
      (resolve, reject) => {
        if (hrRespond) { // when hr responds
          const leaveDetails = {
            startDate: 'Monday',
            endDate: 'Tuesday'
          };
          resolve(leaveDetails);
        } else { // if hr chooses to misbehave as usual
          const error = new Error('The HR refuses to grant the application');

          reject(error.message);
        }
      }
  );
  
  // explain to Nike about the result
  async function explainToNike(value) {
    return new Promise(resolve => resolve(value));    
  } 
  
  // consume the promise result
   async function doLeave() {
     try {
      console.log('Begining of leave application');

      let leaveDetails = await applyForLeave;
      let leaveInfo = await explainToNike(leaveDetails);

      console.log(leaveInfo);
      console.log('after the application ended');
       
     } catch (error) {
       console.log(error);
     }
      
  }
  
// start the process using an IIFE
(async () => {
  await doLeave();  
})();

// ADD SUM USING PROMISE
let resultA, resultB, resultC;

function addAsync(num1, num2) {
	// use ES6 fetch API, which return a promise
// 	return fetch(`http://www.example.com?num1=${num1}&num2=${num2}`)
// 		.then(x => x.json());
  
    return Promise.resolve(num1 + num2);
}

addAsync(1, 2)
	.then(success => {
		resultA = success;
        return resultA;
	})
	.then(success => addAsync(success, 3))
	.then(success => {
		resultB = success;
        return resultB;
	})
	.then(success => addAsync(success, 4))
	.then(success => {
		resultC = success;
        return resultC;
	})
    .then(success => {
        console.log('total: ' + success)
        console.log(resultA, resultB, resultC)
    });

// CONVERTING ADDSUM PROMISE TO ASYN/AWAIT ES7
let resultA, resultB, resultC;

async function addAsync(num1, num2) {
	// use ES6 fetch API, which return a promise
// 	return fetch(`http://www.example.com?num1=${num1}&num2=${num2}`)
// 		.then(x => x.json());
  
    return Promise.resolve(num1 + num2);
}

async function doAsyncSum() {
  try {
    resultA = await addAsync(1, 2);
    resultB = await addAsync(resultA, 3);
    resultC = await addAsync(resultB, 4);
    let total = resultA + resultB + resultC;
    
     console.log('total: ' + total);
     console.log(resultA, resultB, resultC);
    
  }
  catch(error) {
    console.log(error);    
  }
}
 // start the whole process

(async () => {
  await doAsyncSum();
})();
