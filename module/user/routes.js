const express = require("express");
const router = express.Router();
const user = require("./service");
const userObj = new user();
router.post("/login", (req, res) => {
  console.log(req.body);
  try {
    userObj.getUser(req.body, (err, resp) => {
      if (err) {
        res.send(err);
      } else {
        if (resp) {
          return res.send("Login Successful");
        }
        return res
          .status(401)
          .send("Invalid Credentials or User does not exist");
      }
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
