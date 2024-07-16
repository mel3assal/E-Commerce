import slugify from 'slugify';
import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
import { SubCategory } from '../../../database/models/subCategory.mdel.js';
const addsubCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const subcategory=await SubCategory.create(req.body)
    subcategory.save()
    res.status(201).json({message:"subcategory created successfully",subcategory})
})

const getAllsubCategory=catchError(async(req,res,next)=>{
    const subcategories=await SubCategory.find()
    if(!subcategories) return next(new AppError('no subcategories found',404))
    res.status(200).json({message:"subcategories are",subcategories})
})

const getsubCategory=catchError(async(req,res,next)=>{
    const subcategory=await SubCategory.findById(req.params.id)
    if(!subcategory) return next(new AppError('subcategory not found',404))
    res.status(200).json({message:"subcategory is",subcategory})
})
const updatesubCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const subcategory=await SubCategory.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!subcategory) return next(new AppError('subcategory not found ',404))
    res.status(200).json({message:"subcategory updated Successfully",subcategory})
})

const deletesubCategory=catchError(async(req,res,next)=>{
    const subcategory=await SubCategory.findByIdAndDelete({_id:req.params.id},{new:true})
    if(!subcategory) return next(new AppError('subcategory not found',404))
    res.json({message:"subcategory is",subcategory})
})
export {addsubCategory,getAllsubCategory,getsubCategory,updatesubCategory,deletesubCategory}