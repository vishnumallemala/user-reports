const dao = require("../../connector/mongo-connector");
const dbTable = "users";
const daoObj = new dao(dbTable);

class Users {
  getUser(data, cb) {
    let filter = { email: data.username };
    daoObj.find(filter, (err, response) => {
      if (err) {
        cb(err);
      } else {
        if (response[0] && response[0].password === data.password) {
          return cb(null, true);
        }
        return cb(null, false);
      }
    });
  }
}

module.exports = Users;
