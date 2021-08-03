const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const jwtToken = require('../security/Jwttoken')

/**
 * @method POST
 * @param JSON_BODY First name, Last name, Email, and Role. Address, City, and Pincode
 */
router.post("/register", userController.CreateUser)

/**
 * @method POST
 * @param JSON_BODY email, password
 */
router.post("/login", userController.LoginUser)

/**
 * @method POST
 * @param JSON_BODY password , confirm password
 * @description check autheticated
 */
router.post("/resetpassword",jwtToken.AuthenticateUser,  userController.ResetPassword)

/**
 * @method GET
 * @description  ACCESS = > admin only show if it's admin
 */
router.get("/listallusers",jwtToken.AuthenticateAdmin, userController.ListUser)


module.exports = router;