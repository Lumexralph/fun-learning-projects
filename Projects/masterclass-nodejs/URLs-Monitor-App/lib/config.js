/**
 * Create and export the config variable
*/


// Container for all the environment
const environments = { };

// Staging the (default) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging',
  hashingSecret: '12345ty',
  maxChecks: 5,
  twilio: {
    accountSid: "",
    authToken: "",
    fromPhone: "",
  }
};

// Production environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
  hashingSecret: '12345ty',
  maxChecks: 5,
};

// Determine which environment was passed as a command line argument
const currentEnvironment = typeof process.env.NODE_ENV === 'string' ?  process.env.NODE_ENV.toLowerCase() : '';

const environmentToExport = environments[currentEnvironment] ? environments[currentEnvironment] : environments.staging;

// Export the environment variable
module.exports = environmentToExport;
