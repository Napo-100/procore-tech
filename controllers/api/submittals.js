const router = require("express").Router();
const fetch = require("node-fetch");

router.post("/", async (req, res) => {
  const projectId = req.body.projectId;
  const createSubmittal = `https://sandbox.procore.com/rest/v1.0/projects/${projectId}/submittals`;

  const submittalData = {
    title: req.body.name,
    description: req.body.description,
    number: req.body.number,
    revision: req.body.revisionNumber,
    type: req.body.trade,
  };
 try {

   const result = await fetch(createSubmittal, {
     method: "post",
     body: JSON.stringify(submittalData),
     headers: {
       Authorization: req.tokenType + " " + req.token,
       "Content-Type": "application/json",
      },
    })
    const data = await result.json()
    res.json(data)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
