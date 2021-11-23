"use strict";

const responseCodes = require("../helpers/response-codes");
const jsonResponse = require("../utils/json-response");
const express = require("express");
const router = express.Router();
const productHandler = require("../model_handlers/product-handler");

router.get("/getAllProducts", async (req, res) => {
  try {
    let response = await productHandler.getAllProducts();
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
