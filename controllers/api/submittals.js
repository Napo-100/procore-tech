const router = require("express").Router();
const fetch = require("node-fetch");
require("dotenv").config();

const projectId = "3fd8e539-0be9-4706-a8a2-6b057fbea2dd";

const submittalsPath = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals`;
const companyPath = "https://sandbox.procore.com/rest/v1.0/companies"
const projectsPath = "https://sandbox.procore.com/rest/v1.0/projects?company_id=27788"
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
        projectsPath,
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
