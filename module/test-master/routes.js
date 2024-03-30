const express = require("express");
const router = express.Router();
const testMaster = require("./service");
//get all active test list
router.get("/testList", (req, res) => {
  try {
    testMaster.getTestList((err, resp) => {
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
module.exports = router;
