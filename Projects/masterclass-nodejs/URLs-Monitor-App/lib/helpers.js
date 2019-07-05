/**
 * Helpers for various tasks
 *
 */

// Dependencies
const crypto = require('crypto');
const config = require('./config');
const https = require("https");  // it can help to craft https request that will be sent to third party API
const queryString = require('querystring');

// Container for all the helpers
const helpers = {};

// Create a SHA256 hash
helpers.hash = (str) => {
  if (typeof (str) == 'string' && str.length > 0) {
    // Which will take in the algorithm, hashing secret
    const hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse a JSON string to object in all cases without throwing
helpers.parseJsonToObject = (str) => {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

// Create a string of random alphanumeric character with a given length
helpers.createRandomString = (length) => {
  const strLength = typeof (length) == 'number' && length > 0 ? length : false;

  if (strLength) {
    // Define all the possible characters that could go into a string
    const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz1234567890';

    // Create the final string
    let str = '';

    for (let i = 1; i <= length; i += 1) {
      //Get random characters from the possibleCharacters string
      let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));

      // Append randomCharacter to the final string
      str += randomCharacter;
    }

    // Return the final string
    return str;

  } else {
    return false;
  }
};

// library to help communicate with Twilio, a platform for
// sending SMS using phone numbers or making video calls
helpers.sendTwilioSms = (phone, msg, callback) {
  // Validate the parameters
  phone = typeof (phone) == "string" && phone.trim().length == 10 ? phone.trim() : false;
  msg = typeof (msg) == "string" && msg.trim().length > 0 && msg.trim().length <= 1600 ? msg.trim()
    : false;
  if(phone && msg) {
    // Configure the request payload to be sent
    // send a payload to Twilio as a post
    const payload = {
      "From": config.twilio.fromPhone,
      "To": `+234${phone}`,
      "Body": msg,
    };

    // Stringify the payload and configure the request details
    const stringPayload = queryString.stringify(payload);
    const requestDetails = {
      "protocol": "https",
      "hostname": "api.twilio.com",
      "method": "POST",
      "path": `/2010-04-01/Accounts/${config.twilio.accountSid}/Messages.json`,
      "auth": `${config.twilio.accountSid}:${config.twilio.authToken}`,
      "header": {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(stringPayload),
      }
    };

    // Instantiate the request object. when the req.end() send the request off,
    // the callback will be used to respond to the response
    const req = https.request(requestDetails, (res) => {
      // Grab the status of the sent request
      const status = res.statusCode;
      // Callback successfully if the request went through
      if(status === 200 || status === 201) {
        callback(false);
      } else {
        callback(`Status code returned as ${status}`);
      }
    });

    // bind to an error event so it does not get thrown and kill the thread
    req.on('error', (err) => {
      callback(err);
    });

    // Add the payload
    req.write(stringPayload);

    // End the request, is like saying to send the request off when it gets here
    req.end();


  } else {
    callback('Given parameters were missing or invalid');
  }

}

// use zlib to compress and decompress a file

module.exports = helpers;
