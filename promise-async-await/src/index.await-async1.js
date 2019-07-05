// USING aync and await for index.promises1.js

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
