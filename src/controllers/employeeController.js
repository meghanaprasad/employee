'use strict';

const Employee = require('../models/employee')
const restHelper = require('../lib/restHelper')
const queryObj = require('../lib/queryHandler');
const { check, body, validationResult } = require('express-validator');
const { paginationLimit } = require('../config/index')


// Create new employee
exports.create = async (req, res) => {
    restHelper.message = "Failed to place employee"
    restHelper.responseData = {}
    const errors = validationResult(req);
    if (errors.array().length == 0 ) {
        try {
            
            // Create a employee var
            const employee = new Employee({
                name: req.body.name,
                employee_id: req.body.employee_id,
                dob: req.body.dob,
				reports_to: req.body.reports_to,
                updated_at: new Date()
            });

            let data = await queryObj.saveEntry(employee)
            if (data) {
                restHelper.status = 'Success';
                restHelper.code = 200;
                restHelper.message = 'created employee successfully.';
                restHelper.responseData = data;
            }

        } catch (err) {
            restHelper.message = 'Failed to place employee ' + err.message;
        }
    } else {
        restHelper.message = "Failed to place the employee.Please enter valid input data.";
    }
    restHelper.sendResponse(res);
};

// get employee list 
exports.getEmployeeList = async (req, res) => {
    restHelper.message = "Failed to get employee details"
    try {
        let data = await queryObj.getEmployeeList(Employee, req.query, paginationLimit)
        if (Object.entries(data).length > 0) {
            restHelper.status = 'Success';
            restHelper.code = 200;
            restHelper.message = 'Successfully fetched employee list.';
            restHelper.responseData = data;
        } else {
            restHelper.status = 'Success';
            restHelper.code = 204;
            restHelper.message = 'No data.';
            restHelper.responseData = data;
        }

    } catch (err) {
        if (err.kind && err.kind === 'ObjectId') {
            restHelper.message = "employee not found with id " + req.params.id;
            restHelper.code = 204;
        } else {
            restHelper.message = "Error retrieving employee with id " + req.params.id;
        }
    }
    restHelper.sendResponse(res);
};

// delete employee 
exports.deleteEmployee = async (req, res) => {
    restHelper.message = "Failed to delete employee details"
    restHelper.responseData = {};
    try {
        let empData = await queryObj.getEntryById(Employee, req.params.id)
        let deletedData = await queryObj.deleteEntry(Employee, req.params.id)
        if(empData.employee_id && empData.employee_id == 125){
            // updated a emp var
            const empDetails = {
                reports_to:124
            };
            let updatedData = await queryObj.updateEntry(Employee,empDetails)
            //console.log(empData);
        }
        
        if (deletedData || updatedData) {
            restHelper.status = 'Success';
            restHelper.code = 200;
            restHelper.message = 'Successfully deleted employee.';
        } else {
            restHelper.status = 'Success';
            restHelper.code = 204;
            restHelper.message = 'No data.';
        }

    } catch (err) {
        console.log(err)
        if (err.kind && err.kind === 'ObjectId') {
            restHelper.message = "employee not found with id " + req.params.id;
            restHelper.code = 204;
        } else {
            restHelper.message = "Error retrieving employee with id " + req.params.id;
        }
    }
    restHelper.sendResponse(res);
};

/**
 * Returns the validation errors for input.
 *
 * @param {json} request-body.
 * @return {json} returns the validation errors if exist.
 */
exports.validate = (val) => {
    switch (val) {
        case 'create': {
            return [
                check('employee_id').not().isEmpty().trim().escape().isInt().withMessage('please enter the valid employeeid'),
                check('name').not().isEmpty().trim().escape().isLength({ min: 3, max: 150 }).withMessage('please enter valid name'),
				check('reports_to').exists().trim().escape().isInt().withMessage('please enter the valid data for reports_to'),
            ]
        }
    }
}