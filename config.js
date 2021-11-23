"use strict";

const _ = require("underscore");

// const dotenv = require("dotenv");
// dotenv.config();
// const requiredParams = [
//   "DEFAULT_LANGUAGE",
//   "APP_NAME_PROJECT_NAME",
//   "PORT_PROJECT_NAME",
// ];

// for (let i = 0; i < requiredParams.length; i++) {
//   if (!_.has(process.env, requiredParams[i])) {
//     console.log(
//       "Error: environment variables have not been properly setup for the Project Name Platform. The variable:",
//       requiredParams[i],
//       "was not found."
//     );

//     throw new Error(
//       "Project Name Platform Environment Variables Not Properly Set"
//     );
//   }
// }

module.exports = {
  default_language: process.env.DEFAULT_LANGUAGE,
  appName: process.env.APP_NAME_PROJECT_NAME,
  port: process.env.PORT_PROJECT_NAME || 4000,
  jwtTokenKey: "testing123",
};
