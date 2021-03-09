const router = require("express").Router();

const submittalsRoutes = require("./submittals");
const { auth } = require("../../middleware/auth");

// authenticate all api calls with client credentials
router.use(auth);
router.use("/submittals", submittalsRoutes);

module.exports = router;
