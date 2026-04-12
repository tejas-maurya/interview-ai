const {Router} = require('express');
const authController=require("../constroller/auth.controller")
const authRouter=Router();
const authMiddleware=require("../middleware/auth.middleware")

/**
 * @route Post /api/auth/register
 * @description resgister a user 
 * @access public
 * 
 */
authRouter.post("/register",authController.registerUserController)
/**
 * @route Post /api/auth/login
 * @description login user with email and passwor 
 * @access public 
 * 
 */
authRouter.post("/login",authController.loginUserController)

/**
 * @route post /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist 
 * @access public
 *
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * @route DET /api/auth/get-me
 * @description get the current logged in user detail 
 * @access private 
 */
authRouter.get ("get-me",authMiddleware.authUser,authController.getMeController)
module.exports=authRouter
