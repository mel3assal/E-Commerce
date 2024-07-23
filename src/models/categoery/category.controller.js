import slugify from 'slugify';
import { Category } from '../../../database/models/category.model.js';
import { catchError } from './../../middlewares/catchError.js';
import { AppError } from './../../utilis/AppError.js';
import fs from 'fs'
import path from 'path';
import { APIFeatures } from './../../utilis/apiFeatures.js';
const addCategory=catchError(async(req,res,next)=>{
    req.body.image=req.file.filename
    req.body.slug=slugify(req.body.name)
    const category=await Category.create(req.body)
    category.save()
    res.status(201).json({message:"category created successfully",category})
})

const getAllCategory=catchError(async(req,res,next)=>{
    let apiFeatures=new APIFeatures(Category.find(),req.query).pagination().filter().fields().search().sort()
    let categories=await apiFeatures.mongooseQuery
    if(!categories) return next(new AppError('no categoeries found',404))
    res.status(200).json({message:"categories are",categories})
})

const getCategory=catchError(async(req,res,next)=>{
    const category=await Category.findById(req.params.id)
    if(!category) return next(new AppError('category not found',404))
    res.status(200).json({message:"category is",category})
})
const updateCategory=catchError(async(req,res,next)=>{
    const category = await Category.findById(req.params.id)
    if (!category) return next(new AppError('category not found', 404))//there is problem adding the photo to upload file even if not found
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) {
        req.body.image = req.file.filename
        const filePath = path.join('uploads', 'categories', `${category.image.split('/')[5]}`);
        fs.unlinkSync(filePath)
    }
    await category.updateOne(req.body)
    res.status(200).json({ message: "Category updated Successfully", category })
})

const deleteCategory=catchError(async(req,res,next)=>{
    const category=await Category.findByIdAndDelete({_id:req.params.id},{new:true})
    if(!category) return next(new AppError('category not found',404))
    res.json({message:"category is",category})
})
export {addCategory,getAllCategory,getCategory,updateCategory,deleteCategory}