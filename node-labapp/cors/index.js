/*jshint esversion: 6 */
const cors = require('cors')

// can't use * origin with cookies. :(
// https://stackoverflow.com/questions/33483675/getting-express-server-to-accept-cors-request
var whitelist = [
    'http://0.0.0.0:3000',
    'http://localhost:3000'
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;

        // if you're getting cross-domain errors, check if this origin
        // matches one of your whitelist options.
        console.log("corsorigin: ", origin, originIsWhitelisted)
        callback(null, originIsWhitelisted);
    },
    credentials: true
};

//https://www.npmjs.com/package/cors#enabling-cors-pre-flight
//app.options('*', cors(corsOptions)) // include before other routes

// not sure we still need this or not.
//app.use(cors(corsOptions))

module.exports = cors(corsOptions)
