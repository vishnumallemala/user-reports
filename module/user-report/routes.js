const express = require("express");
const { OpenAI } = require("openai");

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

router.post("/submitReport", async (req, res) => {
  try {
    const body = req.body;
    const testType = body.testType;

    const prompt = `Following are the details of my ${testType} report, please analyse and explain in detail the report with less than 500 characters, I understand it will be a tentative analysis and it won't be a accurate assessment ${JSON.stringify(
      body.testData
    )}`;

    const openai = new OpenAI({
      apiKey: process.env.OPEN_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    body["result"] = chatCompletion.choices[0].message.content;
    body["testName"] = body.testType;
    console.log("response from open api", JSON.stringify(body));

    userReport.insertReport(body, (err, resp) => {
      if (err) {
        res.send(err);
      } else {
        if (resp) {
          return res.send(chatCompletion.choices[0].message.content);
        }
        return res
          .status(400)
          .send("Error during report submission. Please submit again");
      }
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
