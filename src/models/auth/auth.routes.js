import { Router } from "express";
import * as authController from './auth.controller.js'
import checkEmail from "../../middlewares/checkEmail.js";
import { validate } from './../../middlewares/validate.js';
import { changePasswordVal, signInVal, signUpVal } from "./auth.validation.js";
const authRouter=Router()
authRouter.post('/signUp',validate(signUpVal),checkEmail,authController.signUp).post('/signIn',validate(signInVal),authController.signIn)
.put('/changePassword',validate(changePasswordVal),authController.changeUserPassword)
export default authRouter