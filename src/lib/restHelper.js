/**
 * @file
 * Library file to handle the rest api related function.
 */

'use strict';

class RestHelper {

    /**
     * @desc to initialize rest response vars.
     */
    constructor(code, status, message) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.responseData = [];
    }

    /**
     * @name sendResponse
     * @desc to send output msg to user.
     * @input response data
     * @output response with code
     */
    sendResponse(res) {
        //console.log(res);
        res.status(this.code).json({
            success: this.status,
            statusCode: this.code,
            message: this.message,
            data: this.responseData
        });
    }

}
const rest = new RestHelper(400, 'Failure', "Something happened, Failed to get resource.");
module.exports = rest;