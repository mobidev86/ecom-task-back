"use strict";

const dbConstants = require("../constants/db-constants");
const query = require("../utils/query-creator");
let async = require("async");
let errors = require("../utils/errorConstant");
let product = require("../models/product");
let config = require("../config");

const getAllProducts = (requestParam) => {
  return new Promise(async (resolve, reject) => {
    try {
      let getProducts = await query.findMany(
        dbConstants.dbSchema.product,
        {},
        {},
        {}
      );

      resolve(getProducts);
      return;
    } catch (error) {
      console.log(error);
      reject(error);
      return;
    }
  });
};

module.exports = {
  getAllProducts: getAllProducts,
};
