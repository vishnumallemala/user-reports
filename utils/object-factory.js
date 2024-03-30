let modelFactory = function (dbModel, dbObj) {
  let schema;
  let model;
  if (dbModel === "users") {
    schema = new dbObj.Schema({
      id: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      firstName: String,
      lastName: String,
      email: String,
      password: String,
      status: {
        type: String,
        enum: ["active", "inactive"],
      },
      createdAt: Date,
    });
    model = dbObj.model(dbModel, schema);
  } else if (dbModel === "testMasters") {
    schema = new dbObj.Schema({
      name: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      isActive: Boolean,
    });
    model = dbObj.model(dbModel, schema);
  } else if (dbModel === "userReports") {
    schema = new dbObj.Schema({
      id: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      testName: String,
      testData: Object,
      result: String,
    });
    model = dbObj.model(dbModel, schema);
  } else if (dbModel === "currency") {
    schema = new dbObj.Schema({
      id: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      code: String,
      description: String,
    });
    model = dbObj.model(dbModel, schema);
  }

  return model;
};

module.exports = {
  modelFactory,
};
