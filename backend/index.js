const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const app = express();
const port = 8080;
require("dotenv").config();

app.use(cors({ origin: "*" }));
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/answer", async (req, res) => {
  const { prompt } = req.body;
  const newPrompt = "" + prompt;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: newPrompt,
      temperature: 0.6,
      max_tokens: 2048,
    });
    console.log("response", response.data);
    res.send(response.data.choices[0].text);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
