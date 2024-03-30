const dao = require("../../connector/mongo-connector");
const dbTable = "userReports";
const daoObj = new dao(dbTable);

let userReport = {
  getReport: (cb) => {
    daoObj.find({}, (err, response) => {
      if (err) {
        cb(err);
      } else {
        return cb(null, response);
      }
    });
  },
  insertReport: (data, cb) => {
    daoObj.create(data, (err, response) => {
      if (err) {
        cb(err);
      } else {
        cb(null, response);
      }
    });
  },
};

module.exports = userReport;
