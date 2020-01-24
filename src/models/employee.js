/**
 * @file
 * model file to handel employee schema.
 */

'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

//defining schema
let employeeSchema = new Schema({
	name: { type: String, required: true },
    employee_id: { type: Number, required: true },
	dob: { type: String },
	reports_to: { type: Number },
    createed_at: { type: Date, default: Date.now },
    updated_at: { type: Date }
})


// Export the model
module.exports = mongoose.model('employee', employeeSchema)