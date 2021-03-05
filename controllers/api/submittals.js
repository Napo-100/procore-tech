const router = require("express").Router();
const fetch = require("node-fetch");
require("dotenv").config();

const projectId = "37400";
const companyId = "27788";
const officeId = "28780";

const submittalsPackages = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittal_packages/`;
const submittalsLog = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals`;
const showSubmittal = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals/`;
const submittalStatus = `https://sandbox.procore.com/rest/v1.0/companies/${companyId}/submittal_statuses`;
const submittalTypes = `https://sandbox.procore.com/rest/v1.0/companies/?company_id=27788/submittal_types`;
const createSubmittal = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals/`;
const companyPath = "https://sandbox.procore.com/rest/v1.0/companies";
const listProjects =
  "https://sandbox.procore.com/rest/v1.0/projects?company_id=27788";
const showProject = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/?company_id=${companyId}`;
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
        // listProjects,
        // showProject,
        submittalStatus,
        // submittalsPackages,
        // submittalTypes,
        // showSubmittal,
        // createSubmittal,
        // submittalsLog,
        // deletedSubmittals,
        {
          headers: {
            Authorization: tokenData.token_type + " " + tokenData.access_token,
            "Content-Type": "application/json",
          },
        }
      );
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("data", data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
