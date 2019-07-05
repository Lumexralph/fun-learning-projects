'use strict';

var hrRespond = true;

var applyForLeave = new Promise(function (resolve, reject) {
  if (hrRespond) {
    // when hr responds
    var leaveDetails = {
      startDate: 'Monday',
      endDate: 'Tuesday'
    };
    resolve(leaveDetails);
  } else {
    // if hr chooses to misbehave as usual
    var error = new Error('The HR refuses to grant the application');
    reject(error);
  }
});

// explain to Nike about the result
var explainToNike = function explainToNike(value) {
  return new Promise(function (resolve) {
    return resolve(value);
  });
};

// consume the promise result
var doLeave = function doLeave() {
  applyForLeave.then(explainToNike).then(function (fulfilled) {
    return console.log('Start date: ' + fulfilled.startDate + ' End date: ' + fulfilled.endDate);
  }).catch(function (error) {
    return console.log(error);
  });
};

// start the process
doLeave();