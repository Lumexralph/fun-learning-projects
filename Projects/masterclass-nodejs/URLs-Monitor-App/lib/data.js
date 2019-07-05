/**
 * Lirbrary for storing and editing data
 *
 */

 // Dependencies
 const fs = require('fs');
 const path = require('path');
 const helpers = require('./helpers');

 // Container for the module to be exported
 const lib = { };

 // Base directory of the data folder
 // To make it a clean path
 lib.baseDirectory = path.join(__dirname, '../.data/');

// Write data to a file
lib.create = (dir, file, data, callback) => {
  // Open the files for writing
  // Using the path and mode for the file operation
  fs.open(`${lib.baseDirectory}${dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
     if(!err && fileDescriptor) {
        // Convert data to string
      const stringData = JSON.stringify(data);

      // Write to the file and close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if(!err) {
          fs.close(fileDescriptor, (err) => {
            if(!err) {
              callback(false);
            } else {
              callback('Error closing file');
            }
          });
        } else {
          callback('Error writing to the new file');
        }
      });
     } else {
      callback('Could not create new file, it could already exist');
     }
  });
};

// Read data from a a file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDirectory}${dir}/${file}.json`, 'utf8', (err, data) => {
    if(!err && data) {
      const parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data)
    }

  });
};

// Update an existing file
lib.update = (dir, file, data, callback) => {
  // Open the file for writing
  fs.open(`${lib.baseDirectory}${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if(!err && fileDescriptor) {
      const stringData = JSON.stringify(data);

      // To be able to update the file with existing data, the file has to be truncated
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          // Write to the file and close it
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              // Close to the file
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback('Error closing the existing file');
                }
              });
            } else {
              callback('Error writing data to existing file');
            }
          });
        } else {
          callback('Error occurred while truncating file');
        }
      });
    }
  });
}

// Delete a file
lib.delete = (dir, file, callback) => {
  // Unlink the file, remove it from the fi[e system
  fs.unlink(`${lib.baseDirectory}${dir}/${file}.json`, (err) => {
    if(!err) {
      callback('File successfully deleted.');
    } else {
      callback('Error deleting the file');
    }
  });
};

 // Export the module
 module.exports = lib;
