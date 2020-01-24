'use strict'

const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employeeController')
router.post('/create', employeeController.validate('create'), employeeController.create)// add employee

module.exports = router