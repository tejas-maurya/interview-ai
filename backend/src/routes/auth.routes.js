const {Router} = require('express');
const authController=require("../constroller/auth.controller")
const authRouter=Router();
const authMiddleware=require("../middleware/auth.middleware")


/**
 * @route POST /api/auth/register
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/logout
 */
authRouter.get("/logout", authController.logoutUserController);

/**
 * @route GET /api/auth/get-me
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController);

module.exports = authRouter;
