const express = require('express');
const router = express.Router();
const claimController = require('../controller/claimController');
const jwtToken = require('../security/Jwttoken')

/**
 * @method GET
 * @param params page no, limit(no of claims per page)
 */
router.get("/listclaims/:page/:limit",jwtToken.AuthenticateUser,claimController.getClaims)

module.exports = router;