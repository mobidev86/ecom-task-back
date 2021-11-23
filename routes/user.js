"use strict";

const responseCodes = require("../helpers/response-codes");
const jsonResponse = require("../utils/json-response");
const express = require("express");
const router = express.Router();
const userHandler = require("../model_handlers/user-handler");
const auth = require("../utils/middleware");

router.post("/signup", async (req, res) => {
  try {
    let response = await userHandler.signupUser(req.body);
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

router.post("/login", async (req, res) => {
  try {
    let response = await userHandler.loginUser(req.body);
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
