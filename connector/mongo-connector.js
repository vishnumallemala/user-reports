const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { modelFactory } = require("../utils/object-factory");
require("dotenv").config();
const DB_NAME = process.env.DB_NAME || "userReport";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || "27017";
let DB_URL;
if (DB_HOST !== "localhost") {
  const DB_USER = process.env.DB_USER;
  const DB_PASS = process.env.DB_PASS;
  DB_URL =
    "mongodb+srv://" + DB_USER + ":" + DB_PASS + "@" + DB_HOST + "/" + DB_NAME;
} else {
  DB_URL = "mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DB_NAME;
}

class DAO {
  constructor(dbTable) {
    this.url = DB_URL;

    try {
      mongoose.connect(this.url, { useNewUrlParser: true });
    } catch (err) {
      console.log(err);
    }
    this.model = modelFactory(dbTable, mongoose);
  }

  create(data, cb) {
    const jsonData = new this.model(data);
    jsonData["id"] = uuidv4();
    try {
      jsonData.save();
      cb(null, "Data Inserted");
    } catch (err) {
      console.log(err);
      cb(err);
    }
  }

  async find(filter, cb) {
    try {
      const docs = await this.model.find(filter, { _id: 0, __v: 0 });
      cb(null, docs);
    } catch (err) {
      console.log(err);
      cb(err);
    }
  }
}

module.exports = DAO;
