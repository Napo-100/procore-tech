const router = require("express").Router();
const fetch = require("node-fetch");

// const body = {
//   grant_type: "client_credentials",
//   client_id: process.env.CLIENT_ID,
//   client_secret: process.env.CLIENT_SECRET,
// };

router.post("/", (req, res) => {
  console.log(req.token)
  if (!req) {
    return "you must provide submittal data";
  }
  if (!req.body.number) {
    console.log("no number", req.body);
    return "you MUST provide a number";
  }
  const projectId = req.body.projectId;
  const createSubmittal = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals`;

  const submittalData = {
    title: req.body.name,
    description: req.body.description,
    number: req.body.number,
    revision: req.body.revisionNumber,
    type: req.body.trade,
  };
  console.log(submittalData);
  // fetch("https://sandbox.procore.com/oauth/token", {
  //   method: "post",
  //   body: JSON.stringify(body),
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then((res) => res.json())
  //   .then((tokenData) => {
  //     console.log(tokenData);
  fetch(createSubmittal, {
    method: "post",
    body: JSON.stringify(submittalData),
    headers: {
      Authorization: req.tokenType + " " + req.token,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log("data", data);
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
