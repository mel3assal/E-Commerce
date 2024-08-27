import { Router } from "express";
import  * as addressesController from './address.controller.js'
import { validate } from './../../middlewares/validate.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAddressesVal, removeAddressesVal } from "./address.validation.js";
const addressesRouter=Router()
addressesRouter.post('/',protectedRoutes,allowedTo('user','admin'),validate(addAddressesVal),addressesController.addAddress).
delete('/:id',protectedRoutes,allowedTo('user','admin'),validate(removeAddressesVal),addressesController.removeFromAddress).
get('/',protectedRoutes,allowedTo('user','admin'),addressesController.getLoggedUserAddress)
export default  addressesRouter