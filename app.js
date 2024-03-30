const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 2000;
const userRoutes = require("./routes/user-routes");
const expenseRoutes = require("./routes/expense-routes");
const categoryRoutes = require("./routes/refcode/category-routes");
const currencyRoutes = require("./routes/refcode/currency-routes");
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');

app.use(express.json());
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);
app.use("/currencies", currencyRoutes);

const server = app.listen(port, () => {
  console.log("App running on", port);
});

module.exports = server;
