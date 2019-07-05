$(function () {

  var worker = new Worker('worker.js');

worker.addEventListener('message', function(e) {
    if(e.data === 'STARTED') {
        // worker has been started
        // sample: update the screen to display worker started
        $('#output').append('<div>Worker started</div>');
    } else if(e.data === 'STOPPED') {
        // worker has been stopped
        // cleanup work (if needed)
        // sample: update the screen to display worker stopped
        $('#output').append('<div>Worker stopped</div>');
    } else {
        // Normal message. Act upon data as needed
        // Sample: display data on screen
        $('#output').append('<div>' + e.data + '</div>');
    }
});

// When you're ready, send the start message
worker.postMessage('START');

// Send data as needed
worker.postMessage('sample data');

// Stop worker when you're done
worker.postMessage('STOP');
  
});