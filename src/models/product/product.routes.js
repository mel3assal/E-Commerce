import { Router } from "express";
import  * as productController from './product.controller.js'
import { uploadMixOfFiles } from "../../fileUpload/fileUpload.js";
const router=Router()
router.post('/',uploadMixOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:8}],'products'),productController.addProduct).
get('/',productController.getAllProducts).
get('/:id',productController.getProduct).
put('/:id',uploadMixOfFiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:8}],'products'),productController.updateProduct).
delete('/:id',productController.deleteProduct)

export default  router