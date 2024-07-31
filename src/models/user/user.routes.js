import { Router } from "express";
import  * as userController from './user.controller.js'
import { validate } from './../../middlewares/validate.js';
import checkEmail from '../../middlewares/checkEmail.js'
const userRouter=Router()
userRouter.post('/',checkEmail,userController.addUser).
get('/',userController.getAllUsers).
get('/:id',userController.getUser).
put('/:id',userController.updateUser).
delete('/:id',userController.deleteUser)
export  default userRouter