import { Router } from "express";
import  * as addressesController from './address.controller.js'
import { validate } from './../../middlewares/validate.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAddressesVal, removeAddressesVal } from "./address.validation.js";
const addressesRouter=Router()
addressesRouter.post('/',protectedRoutes,allowedTo('user'),validate(addAddressesVal),addressesController.addAddress).
delete('/:id',protectedRoutes,allowedTo('user'),validate(removeAddressesVal),addressesController.removeFromAddress).
get('/',protectedRoutes,allowedTo('user'),addressesController.getLoggedUserAddress)
export default  addressesRouter