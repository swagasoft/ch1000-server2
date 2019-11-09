var env = process.env.NODE_ENV || 'development';
// festch config
var config = require('./config.json');
//  add env. config to process.env 

var  envConfig = config[env];
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
