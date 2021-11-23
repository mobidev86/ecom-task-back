"use strict";

const dbConstants = require("../constants/db-constants");
const query = require("../utils/query-creator");
let async = require("async");
const order = require("../models/order");
let errors = require("../utils/errorConstant");
let config = require("../config");
let mongoose = require("mongoose");

const saveOrder = (requestParam) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!requestParam.user || !requestParam.product || !requestParam.total) {
        reject(errors.missingParameters(true));
        return;
      }

      let insertObj = {
        product_info: requestParam.product,
        user: requestParam.user,
        total: requestParam.total,
      };

      let insertOrder = await query.insertSingle(
        dbConstants.dbSchema.order,
        insertObj
      );

      if (insertOrder) {
        resolve(insertOrder);
        return;
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

const getUserOrders = (requestParam) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!requestParam.id) {
        reject(errors.missingParameters(true));
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(requestParam.id)) {
        reject(
          errors.customError("Incorrect User ID", 400, "USER_ID_WRONG", true)
        );
        return;
      }

      let checkUser = await query.findOne(
        dbConstants.dbSchema.user,
        { _id: mongoose.Types.ObjectId(requestParam.id) },
        {}
      );
      checkUser = JSON.parse(JSON.stringify(checkUser));
      if (!checkUser) {
        reject(
          errors.customError(
            "User not Found with this email",
            400,
            "USER_NOT_FOUND",
            true
          )
        );
        return;
      } else {
        let getProducts = await query.findMany(
          dbConstants.dbSchema.order,
          { user: mongoose.Types.ObjectId(requestParam.id) },
          {},
          {}
        );

        resolve(getProducts);
        return;
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  saveOrder,
  getUserOrders,
};
