"use strict";

const dbConstants = require("../constants/db-constants");
const query = require("../utils/query-creator");
let async = require("async");
let offer = require("../models/offer");
const mongoose = require("mongoose");
const errors = require("../utils/errorConstant");

const getAllOffers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let getOffers = await query.findMany(
        dbConstants.dbSchema.offer,
        {},
        {},
        {}
      );

      resolve(getOffers);
      return;
    } catch (error) {
      console.log(error);
      reject(error);
      return;
    }
  });
};

const getSingleOffer = (requestParam) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!requestParam.id) {
        reject(errors.missingParameters(true));
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(requestParam.id)) {
        reject(
          errors.customError("Incorrect Offer ID", 400, "OFFER_ID_WRONG", true)
        );
        return;
      }

      let getOffer = await query.findOne(
        dbConstants.dbSchema.offer,
        { _id: mongoose.Types.ObjectId(requestParam.id) },
        {}
      );

      resolve(getOffer);
      return;
    } catch (error) {
      console.log(error);
      reject(error);
      return;
    }
  });
};

module.exports = {
  getAllOffers: getAllOffers,
  getSingleOffer: getSingleOffer,
};
