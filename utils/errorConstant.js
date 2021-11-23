"use strict";

const _ = require("underscore");
const responseCodes = require("./../helpers/response-codes");

function errorFunc(message, code, name = "error") {
  this.name = name;
  this.message = message || "Default Message";
  this.code = code;
}

errorFunc.prototype = Object.create(Error.prototype);
errorFunc.prototype.constructor = errorFunc;

module.exports = {
  missingParameters: function(formatForWire) {
    const error = new errorFunc(
      "Missing Parameter Error!!",
      responseCodes.BadRequest,
      "Missing Parameter Error!!"
    );
    return formatForWire ? this.formatErrorForWire(error) : error;
  },
  internalServer: function(formatForWire) {
    const error = new errorFunc(
      "Internal Server Error!!",
      responseCodes.InternalServer,
      "Missing_Parameter!!"
    );
    return formatForWire ? this.formatErrorForWire(error) : error;
  },
  noError: function() {
    return null;
  },
  formatErrorForWire: function(errorFunc) {
    return errorFunc;
  },
  customError: function(message, code, name, formatForWire) {
    const error = new errorFunc(message, code, name);
    return formatForWire ? this.formatErrorForWire(error) : error;
  },
};
