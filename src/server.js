'use strict'
const { port } = require('./config/index');
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const db = require('./config/database')

const employee = require('./routes/employee')//Defining the express app
const app = express()//Adding helmet to enhance the API security
app.use(helmet())//Using the bodyParser to parse JSON bodies into JS Objects
app.use(bodyParser.json())//Enabling CORS for all requests
app.use(cors())//Server response headers
app.all('*', function (req, res, next) {

const responseSettings = {
"AccessControlAllowOrigin": '*',
"AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
"AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
"AccessControlAllowCredentials": false
}
/**
 * Headers
 */
res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials)
res.header("Access-Control-Allow-Origin", responseSettings.AccessControlAllowOrigin)
res.header("Access-Control-Allow-Headers", req.headers['access-control-request-headers'] ? req.headers['access-control-request-headers'] : responseSettings.AccessControlAllowHeaders)
res.header("mAccess-Control-Allow-Methods", req.headers['access-control-request-method'] ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods)
if ('OPTIONS' === req.method) {
	res.send(200)
} else {
	next()
}
})

//Routes
app.use('/employee', employee)

app.set('port', port)//listening to the port
app.listen(port)
console.log("Listening on port " + port)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.statusCode = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  let code = err.statusCode ? err.statusCode : 500
  res.status(code).json({
    status: "Failure",
    statusCode: code,
    message: err.message,
    data: []
  })//next()
})
module.exports = app