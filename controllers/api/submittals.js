const router = require("express").Router();
const fetch = require("node-fetch");
require("dotenv").config();

const projectId = "37400";
const companyId = "27788";
const officeId = "28780";
const subId = "19721";

const submittalsPackages = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittal_packages`;

const listSubmittals = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals`;

const showSubmittal = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals/${subId}`;

const submittalStatus = `https://sandbox.procore.com/rest/v1.0/companies/${companyId}/submittal_statuses`;

const createSubmittal = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals`;

const showProject = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/?company_id=${companyId}`;

const body = {
  grant_type: "client_credentials",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};

router.post("/", (req, res) => {
  if (!req) {
    return "you must provide submittal data";
  }
  if(!req.body.number){
    return "you MUST provide a number"
  }
  const submittalData = {
    submittal_package_id: req.body.submittalPackageId,
    title: req.body.name,
    description: req.body.description,
    number: req.body.number,
    revision: req.body.revisionNumber,
    current_revision: req.body.isMostRecentRevision,
    type: req.body.trade,
    status_id: req.body.status,
    
   
  };
  console.log(req.body);
  fetch("https://sandbox.procore.com/oauth/token", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((tokenData) => {
      console.log(tokenData);
      return fetch(
        // companyPath,
        // listProjects,
        // showProject,
        // submittalStatus,
        // submittalAttachments,
        // showSubmittal,
        // listSubmittals,
        // submittalsPackages,
        // submittalPackagesComp,
        createSubmittal,
        // deletedSubmittals,
        {
          method: "post",
          body: JSON.stringify(submittalData),
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
