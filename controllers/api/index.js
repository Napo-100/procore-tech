const router = require("express").Router();

const submittalsRoutes = require("./submittals");

router.use("/submittals", submittalsRoutes);

module.exports = router;
