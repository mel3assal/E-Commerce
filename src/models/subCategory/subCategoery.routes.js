import { Router } from "express";
import  * as subCategoryController from './subCategory.controller.js'
import { uploadSingleFile } from './../../fileUpload/fileUpload.js';
import { validate } from './../../middlewares/validate.js';
import { addSubCategoryVal,deleteSubCategoryval, getSubCategoryVal, updateSubCategoryVal } from "./subCategoery.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
const subCategoryRouter=Router({mergeParams:true}) //merge params 
subCategoryRouter.post('/',protectedRoutes,allowedTo('admin','user'),uploadSingleFile("image",'subCategories'),validate(addSubCategoryVal),subCategoryController.addsubCategory).
get('/',subCategoryController.getAllsubCategory).
get('/:id',validate(getSubCategoryVal),subCategoryController.getsubCategory).
put('/:id',protectedRoutes,allowedTo('admin'),uploadSingleFile('image','subCategories'),validate(updateSubCategoryVal),subCategoryController.updatesubCategory).
delete('/:id',validate(deleteSubCategoryval),subCategoryController.deletesubCategory)

export default  subCategoryRouter