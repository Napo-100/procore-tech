const router = require("express").Router();
const fetch = require("node-fetch");
require("dotenv").config();

const body = {
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

router.post("/auth", (req, res) => {
  // try {
  fetch("https://sandbox.procore.com/oauth/token", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((tokenData) => {
      console.log(tokenData);
      // res.json(tokenData);
      return fetch("https://sandbox.procore.com//rest/v1.0/companies", {
        headers: {
          Authorization: tokenData.token_type + " " + tokenData.access_token,
          "Content-Type": "application/json",
        },
      });
    })
    .then((res) => res.json())
    .then((companyData) => {
      console.log("company", companyData);
      res.json(companyData);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
