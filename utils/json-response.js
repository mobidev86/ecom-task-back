"use strict";
module.exports = function (res, status, error, payload) {
  res.status(status).send(
    JSON.stringify({
      error: error,
      data: payload,
      status: status,
    })
  );
};
