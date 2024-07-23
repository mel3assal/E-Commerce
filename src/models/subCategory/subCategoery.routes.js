import { Router } from "express";
import  * as subCategoryController from './subCategory.controller.js'
import { uploadSingleFile } from './../../fileUpload/fileUpload.js';
import { validate } from './../../middlewares/validate.js';
import { addSubCategoryVal,deleteSubCategoryval, getSubCategoryVal, updateSubCategoryVal } from "./subCategoery.validation.js";
const subCategoryRouter=Router({mergeParams:true}) //merge params 
subCategoryRouter.post('/',uploadSingleFile("image",'subCategories'),validate(addSubCategoryVal),subCategoryController.addsubCategory).
get('/',subCategoryController.getAllsubCategory).
get('/:id',validate(getSubCategoryVal),subCategoryController.getsubCategory).
put('/:id',uploadSingleFile('image','subCategories'),validate(updateSubCategoryVal),subCategoryController.updatesubCategory).
delete('/:id',validate(deleteSubCategoryval),subCategoryController.deletesubCategory)

export default  subCategoryRouter