const router = require("express").Router();
const fetch = require("node-fetch");
require("dotenv").config();

const projectId = "37400";

const submittalsPath = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals?number=1`;
const submittalsLog = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittal_logs/`;
const companyPath = "https://sandbox.procore.com/rest/v1.0/companies";
const projectsPath =
  "https://sandbox.procore.com/rest/v1.0/projects?company_id=27788";
const projectPathSingle =
  `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/?company_id=27788`;
const body = {
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

router.post("/", (req, res) => {
  fetch("https://sandbox.procore.com/oauth/token", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((tokenData) => {
      console.log(tokenData);
      return fetch(
        // projectsPath,
        // submittalsPath,
        // submittalsLog,
        projectPathSingle,
        {
          headers: {
            Authorization: tokenData.token_type + " " + tokenData.access_token,
            "Content-Type": "application/json",
          },
        }
      );
    })
    .then((res) => res.json())
    .then((companyData) => {
      console.log("company", companyData);
      res.json(companyData);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
