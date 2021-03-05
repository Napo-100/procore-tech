const router = require("express").Router();
const fetch = require("node-fetch");
require("dotenv").config();

const body = {
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

router.get("/", async (req, res) => {
  try {
    await fetch("https://sandbox.procore.com/oauth/token", {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((token) => {
        console.log(token);
        res.json(token);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
