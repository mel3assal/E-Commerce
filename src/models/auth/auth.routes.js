import { Router } from "express";
import * as authController from './auth.controller.js'
import checkEmail from "../../middlewares/checkEmail.js";
const authRouter=Router()
authRouter.post('/signUp',checkEmail,authController.signUp).post('/signIn',authController.signIn).put('/changePassword',authController.changeUserPassword)
export default authRouter