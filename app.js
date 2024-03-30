const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 2000;
const userRoutes = require("./module/user/routes");
const testMasterRoutes = require("./module/test-master/routes");
const userReports = require("./module/user-report/routes");
// const expenseRoutes = require("./roues/expense-routes");
// const categoryRoutes = require("./routes/refcode/category-routes");
// const currencyRoutes = require("./routes/refcode/currency-routes");
// app.use("/currencies", currencyRoutes);

app.use("/users", userRoutes);
app.use("/testMaster", testMasterRoutes);
app.use("/userReport", userReports);
// app.use("/expenses", expenseRoutes);
// app.use("/categories", categoryRoutes);

const server = app.listen(port, () => {
  console.log("App running on", port);
});

module.exports = server;
