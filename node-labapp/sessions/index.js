const config = require('../labapp-config.json')
const session = require('express-session')
// use mongodb to hold session info
const MongoDBStore = require('connect-mongodb-session')(session);

var store = new MongoDBStore(
  {
    uri: config.dburl,
    databaseName: config.dbname,
    collection: config.sessionCollection
  });

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

module.exports = session({
  secret: config.secret,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  // Boilerplate options, see:
  // * https://www.npmjs.com/package/express-session#resave
  // * https://www.npmjs.com/package/express-session#saveuninitialized
  resave: true,
  saveUninitialized: true
})
