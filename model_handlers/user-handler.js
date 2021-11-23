"use strict";

const dbConstants = require("../constants/db-constants");
const query = require("../utils/query-creator");
let async = require("async");
const user = require("../models/user");
let passwordHandler = require("../utils/password-handler");
let errors = require("../utils/errorConstant");
let jwt = require("jsonwebtoken");
let config = require("../config");

const signupUser = (requestParam) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(requestParam);
      if (
        !requestParam.username ||
        !requestParam.firstName ||
        !requestParam.lastName ||
        !requestParam.password
      ) {
        reject(errors.missingParameters(true));
        return;
      }
      //check for dupicate email
      let checkEmail = await query.findOne(
        dbConstants.dbSchema.user,
        { email: requestParam.username },
        { _id: 1 }
      );
      if (checkEmail) {
        reject(
          errors.customError(
            "Email Already Registered!",
            400,
            "EMAIL_DUPLICATE",
            true
          )
        );
        return;
      }

      let encryptPass = await passwordHandler.encrypt(requestParam.password);

      let insertObj = {
        name:
          (requestParam.firstName ? requestParam.firstName : "") +
          " " +
          (requestParam.lastName ? requestParam.lastName : ""),
        email: requestParam.username,
        password: encryptPass,
      };

      let insertUser = await query.insertSingle(
        dbConstants.dbSchema.user,
        insertObj
      );

      const token = jwt.sign({ user_id: insertUser._id }, config.jwtTokenKey, {
        expiresIn: "2h",
      });
      console.log(token);
      // save user token
      insertUser = JSON.parse(JSON.stringify(insertUser));
      insertUser.JWTtoken = token;

      if (insertUser) {
        resolve(insertUser);
        return;
      }
    } catch (error) {
      reject(error);
      return;
    }
  });
};

const loginUser = (requestParam) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!requestParam.username || !requestParam.password) {
        reject(errors.missingParameters(true));
        return;
      }
      let checkEmail = await query.findOne(
        dbConstants.dbSchema.user,
        { email: requestParam.username },
        { _id: 1, password: 1, name: 1, createdAt: 1 }
      );
      checkEmail = JSON.parse(JSON.stringify(checkEmail));
      if (checkEmail) {
        let decryptPass = await passwordHandler.decrypt(checkEmail.password);

        if (decryptPass == requestParam.password) {
          delete checkEmail.password;
          resolve(checkEmail);
          return;
        } else {
          reject(
            errors.customError(
              "Incorrect Password!",
              400,
              "USER_NOT_FOUND",
              true
            )
          );
          return;
        }
      } else {
        reject(
          errors.customError(
            "User not Found with this email",
            400,
            "USER_NOT_FOUND",
            true
          )
        );
        return;
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = {
  signupUser,
  loginUser,
};
