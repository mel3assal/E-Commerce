import slugify from 'slugify';
import { Category } from '../../../database/models/category.model.js';
import { catchError } from './../../middlewares/catchError.js';
import { AppError } from './../../utilis/AppError.js';
const addCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const category=await Category.create(req.body)
    category.save()
    res.status(201).json({message:"category created successfully",category})
})

const getAllCategory=catchError(async(req,res,next)=>{
    const categories=await Category.find()
    if(!categories) return next(new AppError('no categoeries found',404))
    res.status(200).json({message:"categories are",categories})
})

const getCategory=catchError(async(req,res,next)=>{
    const category=await Category.findById(req.params.id)
    if(!category) return next(new AppError('category not found',404))
    res.status(200).json({message:"category is",category})
})
const updateCategory=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const category=await Category.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!category) return next(new AppError('category not found ',404))
    res.status(200).json({message:"category is",category})
})

const deleteCategory=catchError(async(req,res,next)=>{
    console.log(req.params.id);
    const category=await Category.findByIdAndDelete({_id:req.params.id},{new:true})
    console.log(category);
    if(!category) return next(new AppError('category not found',404))
    res.json({message:"category is",category})
})
export {addCategory,getAllCategory,getCategory,updateCategory,deleteCategory}