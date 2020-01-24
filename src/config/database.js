'use strict'
const { mongoUrl, mongoDb } = require('./index')
const mongoose = require('mongoose')
const dbUrl = mongoUrl + mongoDb

//connecting to database
mongoose.connect(
  dbUrl + "?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log("Connected to MongoDB database")
})

module.exports = db