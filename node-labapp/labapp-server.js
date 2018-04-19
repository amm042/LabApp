const express = require('express')

// config holds all constant values
const config = require('./labapp-config.json')

// MAIN APP.
const app = express()

// setup CORS
app.options('*', require("./cors"))

// enable sessions on all routes
app.use(require("./sessions"));

// middlewares
app.use(require('body-parser').json())

// ------------_ ROUTES ------------
// /auth/login and /auth/logout routes.
app.use(require("./auth"))

app.use(require("./api"))

app.listen(config.port, () =>
  console.log('labapp listening on port ' + config.port + '!'))
