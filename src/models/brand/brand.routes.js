import { Router } from "express";
import  * as brandController from './brand.controller.js'
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from './../../middlewares/validate.js';
import { addBrandVal, deleteBrandVal, getBrandVal, updateBrandVal } from "./brand.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
const brandRouter=Router()
brandRouter.post('/',protectedRoutes,allowedTo('admin','user'),uploadSingleFile('logo','brands'),validate(addBrandVal),brandController.addBrand).
get('/',brandController.getAllBrands).
get('/:id',validate(getBrandVal),brandController.getBrand).
put('/:id',protectedRoutes,allowedTo('admin','user'),uploadSingleFile('logo','brands'),validate(updateBrandVal),brandController.updateBrand).
delete('/:id',protectedRoutes,allowedTo('admin','user'),validate(deleteBrandVal),brandController.deleteBrand)

export default  brandRouter