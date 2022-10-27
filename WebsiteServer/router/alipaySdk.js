const express = require("express");
const { pcpay } = require("../router_handler/alipaySdk")
const router = express.Router();

router.post("/pcpay", pcpay);

module.exports = router;

