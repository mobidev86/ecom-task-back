"use strict";

const _ = require("underscore");
const mongoose = require("mongoose");
module.exports = {
  findMany: (
    collectionName,
    comparisonColumnsAndValues,
    columnsToSelect,
    sortColumnAndValues
  ) => {
    return new Promise((resolve, reject) => {
      const dbCollection = mongoose.model(collectionName);
      dbCollection
        .find(comparisonColumnsAndValues, columnsToSelect, (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(data);
          return;
        })
        .sort(sortColumnAndValues);
    });
  },

  findOne: (collectionName, comparisonColumnsAndValues, columnsToSelect) => {
    return new Promise((resolve, reject) => {
      const dbCollection = mongoose.model(collectionName);
      dbCollection.findOne(
        comparisonColumnsAndValues,
        columnsToSelect,
        (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(data);
          return;
        }
      );
    });
  },

  insertSingle: (collectionName, columnsAndValues) => {
    return new Promise((resolve, reject) => {
      const dbCollection = mongoose.model(collectionName);
      dbCollection.create(columnsAndValues, (error, data) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(data);
        return;
      });
    });
  },

  updateSingle: function(
    collectionName,
    columnsToUpdate,
    targetColumnsAndValues
  ) {
    return new Promise((resolve, reject) => {
      const dbCollection = mongoose.model(collectionName);
      dbCollection.updateOne(
        targetColumnsAndValues,
        { $set: columnsToUpdate },
        (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(data);
          return;
        }
      );
    });
  },

  updateMany: function(
    collectionName,
    columnsToUpdate,
    targetColumnsAndValues
  ) {
    return new Promise((resolve, reject) => {
      const dbCollection = mongoose.model(collectionName);
      dbCollection.updateMany(
        targetColumnsAndValues,
        { $set: columnsToUpdate },
        { multi: true },
        (error, data) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(data);
          return;
        }
      );
    });
  },

  removeMany: function(collectionName, targetColumnsAndValues) {
    return new Promise((resolve, reject) => {
      const dbCollection = mongoose.model(collectionName);
      dbCollection.remove(targetColumnsAndValues, function(error, data) {
        if (error) {
          reject(error);
          return;
        }

        resolve(data);
        return;
      });
    });
  },

  joinWithAnd: function(collectionName, params) {
    return new Promise((resolve, reject) => {
      const dbCollection = mongoose.model(collectionName);
      dbCollection.aggregate(params).exec(function(error, data) {
        if (error) {
          reject(error);
          return;
        }
        resolve(data);
        return;
      });
    });
  },
};
