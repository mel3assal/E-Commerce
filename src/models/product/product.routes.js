import { Router } from "express";
import  * as productController from './product.controller.js'
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
import { addProductVal, deleteProductval, getProductVal, updateProductVal } from "./product.validation.js";
import { validate } from './../../middlewares/validate.js';
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
const productRouter=Router()
productRouter.post('/',protectedRoutes,allowedTo('admin','user'),uploadMixOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:8}],'products'),validate(addProductVal),productController.addProduct).
get('/',productController.getAllProducts).
get('/:id',validate(getProductVal),productController.getProduct).
put('/:id',protectedRoutes,allowedTo('admin','user'),uploadMixOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:8}],'products'),validate(updateProductVal),productController.updateProduct).
delete('/:id',protectedRoutes,allowedTo('admin','user'),validate(deleteProductval),productController.deleteProduct)

export default  productRouter