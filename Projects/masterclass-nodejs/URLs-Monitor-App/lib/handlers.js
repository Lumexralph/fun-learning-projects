// Dependencies
const _data = require('./data');
const helpers = require('./helpers');
const config = require('./config');

// Configure the server with the router, if no match for the sample, use the not found handler
// look for the pathname in the handler object if it matches, use the handler that matches
// else use the not found handler
// Define the handlers
const handlers = {};

// Handle users path
handlers.users = (data, callback) => {
  const acceptableMethods = ['get', 'post', 'put', 'delete'];

  // Check if the method to handle request is available
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    // respond with a code of method not allowed
    callback(405);
  }
};

// Container for users sub-method
handlers._users = {};

// Users - post
// Required data: firstName, lastName, phone, password, tosAgreement
// Optional data: None
handlers._users.post = (data, callback) => {
  // Check that all required fields are filled out
  const firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 5 ? data.payload.password.trim() : false;
  const tosAgreement = typeof (data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // Make sure that the user doesn't already exists
    _data.read('users', phone, (err, data) => {
      if (err) {
        // Hash the password using a built in library called crypto
        const hashedPassword = helpers.hash(password);

        if (hashedPassword) {
          // Create the user object
          const userObject = {
            firstName,
            lastName,
            phone,
            hashedPassword,
            tosAgreement: true
          };

          // Store the user object
          _data.create('users', phone, userObject, (err) => {
            if (!err) {
              callback(201);
            } else {
              console.log(err);
              callback(500, {
                'Error': 'Could not create the new user'
              });
            }
          });

        } else {
          callback(500, {
            'Error': 'Could not hash the user password'
          });
        }

      } else {
        // User already exists
        callback(409, {
          'Error': 'A user with that phone number already exists'
        });
      }
    });

  } else {
    callback(400, {
      'Error': 'Missing required field'
    });
  }

};

// Users - get
// Only let an authenticated user access their object
handlers._users.get = (data, callback) => {
  // check that the phone number is valid
  const phone = typeof (data.queryStringObject.phone) == 'string'
    && data.queryStringObject.phone.trim().length == 10 ?
    data.queryStringObject.phone.trim() :
    false;
  if (phone) {
    // Get token from the header
    let token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

    // Verify that the given token from headers is valid for the phone number
    handlers._tokens.verifyToken(token, phone, (tokenIsValid) => {
      if (tokenIsValid) {
        // Look up the user
        _data.read('users', phone, (err, data) => {
          if (!err && data) {
            // Return the user without the password
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        });

      } else {
        callback(403, {
          Error: 'Missing the required token in the header or token is invalid'
        });
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing the required field'
    });
  }

};

// Users - put
// Required data: Phone
// Optional: firstName, lastName, password(at least one must be specified)
handlers._users.put = (data, callback) => {
  // check for the required field
  const phone = typeof (data.payload.phone) == 'string'
    && data.payload.phone.trim().length == 10 ?
    data.payload.phone.trim() :
    false;

  // Check for optional fields
  const firstName = typeof (data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof (data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 5 ? data.payload.password.trim() : false;

  // Return error if phone is invalid
  if (phone) {
    // Check for further optional fields
    if (firstName || lastName || password) {
      // Get token from the header
      let token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

      // Verify that the given token from headers is valid for the phone number
      handlers._tokens.verifyToken(token, phone, (tokenIsValid) => {
        if (tokenIsValid) {
          // Lookup the user
          _data.read('users', phone, (err, userData) => {
            if (!err && userData) {
              // Update the necessary fields
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.hashedPassword = helpers.hash(password);
              }

              // Store the new update
              _data.update('users', phone, userData, (err) => {
                if (!err) {
                  // the update was successful
                  callback(200);
                } else {
                  callback(500, {
                    'Error': 'Update of data could not be completed'
                  });
                }
              });
            } else {
              callback(400, {
                'Error': 'The specified user does not exist'
              });
            }
          });

        } else {
          callback(403, {
            Error: 'Missing the required token in the header or token is invalid'
          });
        }
      });

    } else {
      callback(400, {
        'Error': 'Missing fields to update'
      });
    }

  } else {
    callback(400, {
      'Error': 'Missing required fields'
    });
  }
};

// Users - delete
// Required: Phone
// Delete any other associated files to the user
handlers._users.delete = (data, callback) => {
  const phone = typeof (data.queryStringObject.phone) == 'string'
    && data.queryStringObject.phone.trim().length == 10 ?
    data.queryStringObject.phone.trim() :
    false;
  // Get token from the header
  let token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

  if (phone) {
    // Verify that the given token from headers is valid for the phone number
    handlers._tokens.verifyToken(token, phone, (tokenIsValid) => {
      if (tokenIsValid) {
        // Lookup the user
        // Look up the user
        _data.read('users', phone, (err, data) => {
          if (!err && data) {
            _data.delete('users', phone, (err, userData) => {
              if (!err) {
                // Delete each of the checks associated with the user
                const userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];
                const checksToDelete = userChecks.length;
                if(checksToDelete > 0) {
                  let checksDeleted = 0;
                  let deletionErrors = false;

                  // loop through the checks
                  userChecks.forEach(checkId => {
                    // Delete the checks
                    _data.delete('checks', checkId, (err) => {
                      if(err) {
                        deletionErrors = true;
                      }
                      checksDeleted += 1;

                      if(checksDeleted === checksToDelete){
                        if(!deletionErrors) {
                          callback(200);
                        } else {
                          callback(500, {
                            Error: 'Errors encountered deleting all the user checks, all checks might not be deleted successfully'
                          });
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }


                callback(200);
              } else {
                callback(500, {
                  'Error': 'Could not delete the specified user'
                });
              }
            });

          } else {
            callback(400, {
              'Error': 'Could not find the specified user'
            });
          }
        });

      } else {
        callback(403, {
          Error: 'Missing the required token in the header or token is invalid'
        });
      }
    });

  } else {
    callback(400, {
      'Error': 'Missing the required field'
    });
  }

};

// Handlers for tokens path
// Token for authenticating requests coming to our server
handlers.tokens = (data, callback) => {
  const acceptableMethods = ['get', 'post', 'put', 'delete'];

  // Check if the method to handle request is available
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    // respond with a code of method not allowed
    callback(405);
  }
};

// Container for all tokens methods
handlers._tokens = {};

// Create sub-methods for tokens
// Post
// Required data: phone and password
// Optional data: None
handlers._tokens.post = (data, callback) => {
  const phone = typeof (data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  const password = typeof (data.payload.password) == 'string' && data.payload.password.trim().length > 5 ? data.payload.password.trim() : false;

  if (phone && password) {
    // Lookup the user who matches the phone number
    _data.read('users', phone, (err, userData) => {
      if (!err && userData) {
        // Check the sent password against the hashed password
        const hashedPassword = helpers.hash(password);

        if (hashedPassword === userData.hashedPassword) {
          // if valid, create a token with a random name and set expiration date 1 hour in the future
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + 1000 * 60 * 60;
          const tokenObject = {
            phone,
            id: tokenId,
            expires,
          };

          // Store the token
          _data.create('tokens', tokenId, tokenObject, (err) => {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, {
                Error: 'Could not create the new token'
              });
            }
          });

        } else {
          callback(400, {
            Error: 'Password did not match the specified user\'s stored password'
          });
        }


      } else {
        callback(400, {
          Error: 'Could not find the specified user'
        });
      }
    })

  } else {
    callback(400, {
      'Error': 'Missing required field(s)'
    });
  }
};

// get
// Required data: id
// Optional data: none
handlers._tokens.get = (data, callback) => {
  // Check that the id is valid
  const id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id : false;

  if (id) {
    // Look up the user
    _data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing the required field'
    });
  }
};

// Allow users to be able to extend the expiration if the token
// Required data: id, extent
// Optional data: none
handlers._tokens.put = (data, callback) => {
  const id = typeof (data.payload.id) === 'string' && data.payload.id.trim().length === 20 ? data.payload.id : false;
  const extend = typeof (data.payload.extend) === 'boolean' && data.payload.extend === true ? true : false;

  if (id && extend) {
    // Lookup the token
    _data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        // Check if token has not expired
        if (tokenData.expires > Date.now()) {
          // Set the new expiration to an hour from now
          tokenData.expires = Date.now + 1000 * 60 * 60;

          // Save the new token to disk
          _data.update('tokens', id, tokenData, (err) => {
            if (!err) {
              callback(200);
            } else {
              callback(500, {
                Error: 'Could not update the token\'s expiration'
              });
            }
          });

        } else {
          callback(400, {
            Error: 'The token has already expired and cannot  be extended'
          });
        }

      } else {
        callback(400, {
          Error: 'Provided token does not exist'
        });
      }
    });
  } else {
    callback(400, {
      Error: 'Missing required field(s) or field(s) are invalid'
    });
  }


};

// Tokens - Delete
// Required - id
// Optional data: none
handlers._tokens.delete = (data, callback) => {
  // Check that the id is valid
  const id = typeof (data.queryStringObject.id) === 'string' && data.queryStringObject.id.trim().length === 20 ? data.queryStringObject.id : false;

  if (id) {
    // Look up the token
    _data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        _data.delete('tokens', id, (err) => {
          if (!err) {
            callback(200);
          } else {
            callback(500, {
              Error: 'Could not delete the specified token'
            });
          }
        });
      } else {
        callback(404, {
          Error: 'Could not find the specified token'
        });
      }
    });
  } else {
    callback(400, {
      'Error': 'Missing the required field'
    });
  }
};


// Verify if a given token id is valid for a given user
handlers._tokens.verifyToken = (id, phone, callback) => {
  //Look up the token
  _data.read('tokens', id, (err, tokenData) => {
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.phone === phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
}


// Handlers for checks path
// Checks for knowing when a URL is up or down
handlers.checks = (data, callback) => {
  const acceptableMethods = ['get', 'post', 'put', 'delete'];

  // Check if the method to handle request is available
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback);
  } else {
    // respond with a code of method not allowed
    callback(405);
  }
};

// Container for all checks methods
// Handler for checks
handlers._checks = {};

// Checks - post
// Required data: protocol, url, method, successCodes, timeoutSeconds
// Optional data: none
handlers._checks.post = (data, callback) => {
  // Validate all the inputs
  const protocol = typeof (data.payload.protocol) === 'string' && ['http', 'https'].indexOf(data.payload.protocol.trim()) > -1 ? data.payload.protocol.trim() : false;
  const url = typeof (data.payload.url) === 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  const method = typeof (data.payload.method) === 'string' && ['post', 'put', 'get', 'delete'].indexOf(data.payload.method.trim()) > -1 ? data.payload.method.trim() : false;
  const successCodes = typeof (data.payload.successCodes) === 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  // time should be a whole number
  const timeoutSeconds = typeof (data.payload.timeoutSeconds) === 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    // Get the token from the header
    const token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

    // Lookup the user by reading the token
    _data.read('tokens', token, (err, tokenData) => {
      if (!err && tokenData) {
        const userPhone = tokenData.phone;

        // Lookup the user data
        _data.read('users', userPhone, (err, userData) => {
          if (!err && userData) {
            const userChecks = typeof (userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];

            // Verify that the user has less than max checks per user
            if (userChecks.length < config.maxChecks) {
              // Create a random ID for the checks
              const checkId = helpers.createRandomString(20);

              // Create a check object and include the user's phone
              const checkObject = {
                id: checkId,
                userPhone,
                protocol,
                url,
                method,
                successCodes,
                timeoutSeconds,
              }

              // Persist object to disk
              _data.create('checks', checkId, checkObject, (err) => {
                if (!err) {
                  // Add the check id to the user's object
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  // Save the new user data
                  _data.update('users', userPhone, userData, (err) => {
                    if (!err) {
                      // Return the data about the new check
                      callback(200, checkObject);
                    } else {
                      callback(500, {
                        Error: 'Could not update the user with the new check'
                      });
                    }

                  });

                } else {
                  callback(500, {
                    Error: 'Could not create the new check'
                  });
                }
              });

            } else {
              callback(400, {
                Error: `The user already has the maximum number of checks (${config.maxChecks})`
              });
            }

          } else {
            callback(403);
          }

        });

      } else {
        callback(403);
      }
    });

  } else {
    callback(400, {
      Error: 'Missing required inputs, or inputs are invalid'
    });
  }
};

// Checks - get
// Required data: id
// Optional data: none
handlers._checks.get = (data, callback) => {
  // check that the phone number is valid
  const id = typeof (data.queryStringObject.id) == 'string'
    && data.queryStringObject.id.trim().length == 20 ?
    data.queryStringObject.id.trim() :
    false;
  if (id) {
    // Look up the check
    _data.read('checks', id, (err, checkData) => {
      if (!err && checkData) {
        // Get token from the header
        let token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

        // Verify that the given token from headers is valid and belongs to the user who created the check
        handlers._tokens.verifyToken(token, checkData.userPhone, (tokenIsValid) => {
          if (tokenIsValid) {
            // Return the checkData
            callback(200, checkData);
          } else {
            callback(403);
          }
        });

      } else {
        callback(404);
      }
    });

  } else {
    callback(400, {
      'Error': 'Missing the required field'
    });
  }

};

// Check - put
// Required data: id
// Optional data: protocol, url, method, statusCodes, timeoutSeconds
handlers._checks.put = (data, callback) => {
  // Validate all the inputs
  const id = typeof (data.payload.id) === 'string' && data.payload.id.trim().length === 20 ? data.payload.id : false;
  const protocol = typeof (data.payload.protocol) === 'string' && ['http', 'https'].indexOf(data.payload.protocol.trim()) > -1 ? data.payload.protocol.trim() : false;
  const url = typeof (data.payload.url) === 'string' && data.payload.url.trim().length > 0 ? data.payload.url.trim() : false;
  const method = typeof (data.payload.method) === 'string' && ['post', 'put', 'get', 'delete'].indexOf(data.payload.method.trim()) > -1 ? data.payload.method.trim() : false;
  const successCodes = typeof (data.payload.successCodes) === 'object' && data.payload.successCodes instanceof Array && data.payload.successCodes.length > 0 ? data.payload.successCodes : false;
  // time should be a whole number
  const timeoutSeconds = typeof (data.payload.timeoutSeconds) === 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5 ? data.payload.timeoutSeconds : false;

  // Check to make sure id is valid
  if (id) {
    // Check to make sure one or more optional fields has been sent
    if (protocol || url || method || successCodes || timeoutSeconds) {
      _data.read('checks', id, (err, checkData) => {
        if (!err && checkData) {
          // Get token from the header
          let token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

          // Verify that the given token from headers is valid for the phone number
          handlers._tokens.verifyToken(token, checkData.userPhone, (tokenIsValid) => {
            if (tokenIsValid) {
              // Update the check where necessary
              if (protocol) {
                checkData.protocol = protocol;
              }
              if (url) {
                checkData.url = url;
              }
              if (method) {
                checkData.method = method;
              }
              if (successCodes) {
                checkData.successCodes = successCodes;
              }
              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds;
              }

              // Store the new updates
              _data.update('checks', id, checkData, (err) => {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, {
                    Error: 'Could not update the check'
                  });
                }
              });

            } else {
              callback(401, {
                Error: 'There is  no token provided in the header or the token is invalid'
              });
            }
          })

        } else {
          callback(400, {
            Error: 'Check ID did not exist'
          });
        }
      });
    } else {
      callback(400, {
        Error: 'Missing fields to update'
      });
    }

  } else {
    callback(400, {
      Error: 'Missing required field'
    });
  }
};

// Checks - delete
// Required: id
// Delete any other associated files to the id
handlers._checks.delete = (data, callback) => {
  const id = typeof (data.queryStringObject.id) == 'string'
    && data.queryStringObject.id.trim().length == 20 ?
    data.queryStringObject.id.trim() :
    false;
  // Get token from the header
  let token = typeof (data.headers.token) === 'string' ? data.headers.token : false;

  if (id) {
    // Lookup the check
    // Verify that the given token from headers is valid for the user
    _data.read('checks', id, (err, checkData) => {
      if(!err && checkData) {
        handlers._tokens.verifyToken(token, checkData.userPhone, (tokenIsValid) => {
          if (tokenIsValid) {
            // Delete the check data
            _data.read('checks', id, (err) => {
              if(!err) {
                // Lookup the user
            _data.read('users', checkData.userPhone, (err, userData) => {
              if (!err && userData) {
                const userChecks = typeof(userData.checks) === 'object' && userData.checks instanceof Array ? userData.checks : [];

                // Remove the deleted check from the list of checks
                const checkPosition = userChecks.indexOf(id);

                if(checkPosition > -1) {
                  // Create a copy of the checks array
                  const copyChecks = userChecks.slice(0);
                  copyChecks.splice(checkPosition, 1);

                  userData.checks = copyChecks;


                  // Re-save the user's data
                  _data.update('users', checkData.userPhone, userData, (err) => {
                    if (!err) {
                      callback(200);
                    } else {
                      callback(500, {
                        'Error': 'Could not update the specified user'
                      });
                    }
                  });

                } else {
                  callback(500, {
                    Error: 'Could not find the check on the user\'s position so could not delete it'
                  });
                }
    
              } else {
                callback(400, {
                  'Error': 'Could not find the specified user'
                });
              }
            });

              } else {
                callback(500, {
                  Error: 'Could not delete the check data'
                });
              }
            });

    
          } else {
            callback(403, {
              Error: 'Missing the required token in the header or token is invalid'
            });
          }
        });


      } else {
        callback(400, {
          Error: 'The specified check ID does not exist'
        });
      }
    });

  } else {
    callback(400, {
      'Error': 'Missing the required field'
    });
  }

};

// Handlers for tokens path
// Token for authenticating requests coming to our server
handlers.tokens = (data, callback) => {
  const acceptableMethods = ['get', 'post', 'put', 'delete'];

  // Check if the method to handle request is available
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    // respond with a code of method not allowed
    callback(405);
  }
};

// sample method
handlers.ping = (data, callback) => {
  // callback an http status code and payload object
  callback(null, { success: 'I am still alive' })
};

// handle pathname that was not found
handlers.notFound = (data, callback) => {
  callback(404);
};

module.exports = handlers;
