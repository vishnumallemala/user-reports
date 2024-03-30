const dao = require("../../connector/mongo-connector");
const dbTable = "testMasters";
const daoObj = new dao(dbTable);

let testMaster = {
  getTestList: (cb) => {
    const filter = { isActive: true };
    daoObj.find(filter, (err, response) => {
      if (err) {
        cb(err);
      } else {
        return cb(null, response);
      }
    });
  },
};

module.exports = testMaster;
