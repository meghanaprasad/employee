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

    
}
const queryObj = new QueryHandler();
module.exports = queryObj;