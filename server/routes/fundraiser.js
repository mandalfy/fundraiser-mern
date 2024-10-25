const express = require("express");
const router = express.Router();
const fundraiserController = require("../controllers/fundraisercontrollers");

router.post("/create", fundraiserController.createFundraiser);
router.get("/all", fundraiserController.getAllFundraisers);

module.exports = router;
