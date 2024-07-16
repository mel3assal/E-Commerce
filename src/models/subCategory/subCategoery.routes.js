import { Router } from "express";
import  * as subCategoryController from './subCategory.controller.js'
const router=Router()
router.post('/',subCategoryController.addsubCategory).
get('/',subCategoryController.getAllsubCategory).
get('/:id',subCategoryController.getsubCategory).
put('/:id',subCategoryController.updatesubCategory).
delete('/:id',subCategoryController.deletesubCategory)

export default  router