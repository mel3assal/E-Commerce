import { Router } from "express";
import  * as userController from './user.controller.js'
import { validate } from './../../middlewares/validate.js';
import checkEmail from '../../middlewares/checkEmail.js'
import { addUserVal, deleteUserVal, updateUserVal } from "./user.validation.js";
const userRouter=Router()
userRouter.post('/',checkEmail,validate(addUserVal),userController.addUser).
get('/',userController.getAllUsers).
get('/:id',userController.getUser).
put('/:id',validate(updateUserVal),userController.updateUser).
delete('/:id',validate(deleteUserVal),userController.deleteUser)
export  default userRouter