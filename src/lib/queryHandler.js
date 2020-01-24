/**
 * @file
 * Library file to handle the query related function.
 */

'use strict';

//QueryHandler class
class QueryHandler {

    /**
     * @name saveEntry
     * @desc to create the employee entry in db.
     * @input DB element to save
     * @output employee obj / err obj
     */
    saveEntry(element) {
        return new Promise((resolve, reject) => {
            // save the employee
            element.save(function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }

    /**
     * @name getemployeeList
     * @desc to get the employee list based on query params.
     * @input DB element and queries
     * @output employee objs / err obj
     */
    getEmployeeList(element,querys,paginationLimit) {
        return new Promise((resolve, reject) => {
            let skipVal = querys.pageNo ? parseInt(querys.pageNo) - 1 : 0;
            let limitVal = paginationLimit ? parseInt(paginationLimit) : 9;
            skipVal = limitVal * skipVal;
            limitVal = limitVal;
            
            // get the entry with specified fields
            element.find().skip(skipVal).limit(limitVal).exec( function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }

    
    
}
const queryObj = new QueryHandler();
module.exports = queryObj;