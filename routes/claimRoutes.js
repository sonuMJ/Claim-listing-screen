const express = require('express');
const router = express.Router();
const claimController = require('../controller/claimController');

/**
 * @method GET
 * @param params page no, limit(no of claims per page)
 */
router.get("/listclaims/:page/:limit",claimController.getClaims)

module.exports = router;