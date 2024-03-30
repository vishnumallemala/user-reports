const express = require("express");
const router = express.Router();
const userReport = require("./service");
//get all active test list
router.get("/getReport", (req, res) => {
  try {
    userReport.getReport((err, resp) => {
      if (err) {
        res.send(err);
      } else {
        res.send(resp);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/submitReport", (req, res) => {
  try {
    userReport.insertReport(req.body, (err, resp) => {
      if (err) {
        res.send(err);
      } else {
        if (resp) {
          return res.send("Report Submitted");
        }
        return res.status(400).send("Error during submission");
      }
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
