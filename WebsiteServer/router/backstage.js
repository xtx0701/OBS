const express = require("express");
const { getSetupMessage, changeSetupMessageNum, changeWechatNum, userLogin } = require("../router_handler/backstage")
const router = express.Router();

router.get("/getSetupMessage", getSetupMessage);
router.post("/changeSetupMessageNum", changeSetupMessageNum);
router.post("/changeWechatNum", changeWechatNum);
router.post("/userLogin", userLogin);


module.exports = router;

