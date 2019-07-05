const startWork = () => {
  // code to start performing the work here
  // send a message to the calling page
  self.postMessage('STARTED');
}

const stopWork = () => {
  // cleanup code here
  // stop the worker
  self.postMessage('STOPPED');
  self.close();
}

const processData = (data) => {
  // perform the work on the data
  self.postMessage(`Processed ${data}`);
}

self.addEventListener('message', (e) => {
  if(e.data === 'START') {
    // Start message received
    // Begin work
    startWork();
  } else if (e.data === 'STOP') {
    // stop message received
    // Perform cleanup and terminate
    stopWork();
  } else {
    // A different message has been received
    // This is data that needs to be acted upon
    processData(e.data);
  }
});

// /////////////////////////////////
// using deferred object to create a promise
function beginProcessing() {
	// Create deferred object & make sure it's going to be in scope
	var deferred = new $.Deferred();

	// Create our worker (just like before)
	var worker = new Worker('./Scripts/deferred.js');

	// Register the message event handler
	worker.addEventListener('message', function (e) {
		// simple messaging - if the worker is ready it'll send a message with READY as the text
		if (e.data === 'READY') {
			// No UI code
			// Progress notification
			deferred.notify('Worker started');
		} else if(e.data === 'COMPLETED') {
			// processing is done
			// No UI code
			// Completed notification
			deferred.resolve('Worker completed');

			worker.terminate();
		}
	});

  return deferred.promise();
  
}