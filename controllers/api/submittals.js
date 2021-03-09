const router = require("express").Router();
const fetch = require("node-fetch");

router.post("/", (req, res) => {
  const projectId = req.body.projectId;
  const createSubmittal = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals`;

  const submittalData = {
    title: req.body.name,
    description: req.body.description,
    number: req.body.number,
    revision: req.body.revisionNumber,
    type: req.body.trade,
  };

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
      res.json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
