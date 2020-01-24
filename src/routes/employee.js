'use strict'

const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employeeController')

router.post('/create', employeeController.validate('create'), employeeController.create)// add employee
router.get('/list', employeeController.getEmployeeList)// Get employee list
router.delete('/delete/:id', employeeController.deleteEmployee) //delete employee

module.exports = router