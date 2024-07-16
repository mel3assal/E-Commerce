import { Router } from "express";
import  * as brandController from './brand.controller.js'
const router=Router()
router.post('/',brandController.addBrand).
get('/',brandController.getAllBrands).
get('/:id',brandController.getBrand).
put('/:id',brandController.updateBrand).
delete('/:id',brandController.deleteBrand)

export default  router