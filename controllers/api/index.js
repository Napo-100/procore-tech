const router = require("express").Router();

const submittalsRoutes = require("./submittals");
const { auth } = require("../../middleware/auth");

router.use(auth);
router.use("/submittals", submittalsRoutes);

module.exports = router;
