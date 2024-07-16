import { Router } from "express";
import  * as categoeryController from './category.controller.js'
const router=Router()
router.post('/',categoeryController.addCategory).
get('/',categoeryController.getAllCategory).
get('/:id',categoeryController.getCategory).
put('/:id',categoeryController.updateCategory).
delete('/:id',categoeryController.deleteCategory)

export default  router