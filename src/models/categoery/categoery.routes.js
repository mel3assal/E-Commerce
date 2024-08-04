import { Router } from "express";
import  * as categoeryController from './category.controller.js'
import { uploadSingleFile } from "../../fileUpload/fileUpload.js";
import { validate } from './../../middlewares/validate.js';
import { addCategoryVal, deleteCategoryval, getCategoryVal, updateCategoryVal } from "./categoery.validation.js";
import subCategoryRouter from "../subCategory/subCategoery.routes.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
const categoryRouter=Router()
categoryRouter.use('/:category/subCategories',subCategoryRouter) //merge params
categoryRouter.post('/',protectedRoutes,allowedTo('user','admin'),uploadSingleFile('image','categories'),validate(addCategoryVal),categoeryController.addCategory).
get('/',categoeryController.getAllCategory).
get('/:id',validate(getCategoryVal),categoeryController.getCategory).
put('/:id',protectedRoutes,allowedTo('admin'),uploadSingleFile('image','categories'),validate(updateCategoryVal),categoeryController.updateCategory).
delete('/:id',protectedRoutes,validate(deleteCategoryval),categoeryController.deleteCategory)
export  default categoryRouter