import { Router } from "express";
import  * as subCategoryController from './subCategory.controller.js'
import { uploadSingleFile } from './../../fileUpload/fileUpload.js';
import { validate } from './../../middlewares/validate.js';
import { addSubCategoryVal, deleteSubCategoryval, getAllCateoriesVal, getSubCategoryVal, updateSubCategoryVal } from "./subCategoery.validation.js";
const router=Router()
router.post('/',uploadSingleFile('image','subCategories'),validate(addSubCategoryVal),subCategoryController.addsubCategory).
get('/',validate(getAllCateoriesVal),subCategoryController.getAllsubCategory).
get('/:id',validate(getSubCategoryVal),subCategoryController.getsubCategory).
put('/:id',uploadSingleFile('image','subCategories'),validate(updateSubCategoryVal),subCategoryController.updatesubCategory).
delete('/:id',validate(deleteSubCategoryval),subCategoryController.deletesubCategory)

export default  router