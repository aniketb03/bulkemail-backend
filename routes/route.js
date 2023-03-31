const router = require("express").Router();
const { email } = require("../controller/appController.js");

// router.post("/user/signup", signup);
router.post("/sendmail", email);

module.exports = router;
