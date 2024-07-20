import { Router } from "express";
import  * as categoeryController from './category.controller.js'
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from './../../middlewares/validate.js';
import { addCategoryVal, deleteCategoryval, getAllCateoriesVal, getCategoryVal, updateCategoryVal } from "./categoery.validation.js";
const router=Router()
router.post('/',uploadSingleFile('image','categories'),validate(addCategoryVal),categoeryController.addCategory).
get('/',validate(getAllCateoriesVal),categoeryController.getAllCategory).
get('/:id',validate(getCategoryVal),categoeryController.getCategory).
put('/:id',uploadSingleFile('image','categories'),validate(updateCategoryVal),categoeryController.updateCategory).
delete('/:id',validate(deleteCategoryval),categoeryController.deleteCategory)

export default  router