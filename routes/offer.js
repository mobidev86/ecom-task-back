"use strict";

const responseCodes = require("../helpers/response-codes");
const jsonResponse = require("../utils/json-response");
const express = require("express");
const router = express.Router();
const offerHandler = require("../model_handlers/offer-handler");

router.get("/getAllOffers", async (req, res) => {
  try {
    let response = await offerHandler.getAllOffers();
    jsonResponse(res, responseCodes.OK, null, response);
  } catch (error) {
    console.log(error);
    try {
      jsonResponse(res, error.code, error.message, null);
      return;
    } catch (error) {
      jsonResponse(res, responseCodes.InternalServer, "Server Error!", null);
      return;
    }
  }
});

router.get("/getSingleOffer/:id", async (req, res) => {
  try {
    let response = await offerHandler.getSingleOffer(req.params);
    jsonResponse(res, responseCodes.OK, null, response);
  } catch (error) {
    console.log(error);
    try {
      jsonResponse(res, error.code, error.message, null);
      return;
    } catch (error) {
      jsonResponse(res, responseCodes.InternalServer, "Server Error!", null);
      return;
    }
  }
});

module.exports = router;
