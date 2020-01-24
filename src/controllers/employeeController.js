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
        };
        case 'updateOrder': {
            return [
                check('customerid').not().isEmpty().trim().escape().isInt().withMessage('please enter the valid customerid'),
                check('restaurant_id').exists().trim().escape().isLength({ min: 3, max: 150 }).withMessage('please enter valid restaurant_id'),
            ]
        }
    }
}