"use strict";

const responseCodes = require("../helpers/response-codes");
const jsonResponse = require("../utils/json-response");
const errors = require("../utils/errorConstant");
const express = require("express");
const router = express.Router();
const orderHandler = require("../model_handlers/order-handler");

router.post("/saveOrder", async (req, res) => {
  try {
    let response = await orderHandler.saveOrder(req.body);
    jsonResponse(res, responseCodes.OK, errors.noError(), response);
  } catch (error) {
    try {
      jsonResponse(res, error.code, errors.formatErrorForWire(error), null);
      return;
    } catch (error) {
      jsonResponse(
        res,
        responseCodes.InternalServer,
        errors.internalServer(true),
        null
      );
      return;
    }
  }
});

router.get("/getUserOrders/:id", async (req, res) => {
  try {
    let response = await orderHandler.getUserOrders(req.params);
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
