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
