import slugify from 'slugify';
import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
import { SubCategory } from '../../../database/models/subCategory.mdel.js';
import fs from 'fs'
import path from 'path';
import { APIFeatures } from '../../utilis/apiFeatures.js';
const addsubCategory=catchError(async(req,res,next)=>{
    req.body.image=req.file.filename
    req.body.slug=slugify(req.body.name)
    const subcategory=await SubCategory.create(req.body)
    subcategory.save()
    res.status(201).json({message:"subcategory created successfully",subcategory})
})

const getAllsubCategory=catchError(async(req,res,next)=>{
    let filterObj={}
    if(req.params.category) filterObj.category=req.params.category
    let apiFeatures=new APIFeatures(SubCategory.find(filterObj),req.query).filter().fields().sort().search().pagination()
    const subcategories=await apiFeatures.mongooseQuery.populate('category')
    if(!subcategories) return next(new AppError('no subcategories found',404))
    res.status(200).json({message:"subcategories are",subcategories})
})

const getsubCategory=catchError(async(req,res,next)=>{
    const subcategory=await SubCategory.findById(req.params.id).populate('category') 
    if(!subcategory) return next(new AppError('subcategory not found',404))
    res.status(200).json({message:"subcategory is",subcategory})
})
const updatesubCategory=catchError(async(req,res,next)=>{
    const subCategory = await SubCategory.findById(req.params.id)
    if (!subCategory) return next(new AppError('subCategory not found', 404))//there is problem adding the photo to upload file even if not found
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) {
        req.body.image = req.file.filename
        const filePath = path.join('uploads', 'subCategories', `${subCategory.image.split('/')[5]}`);
        fs.unlinkSync(filePath)
    }
    await subCategory.updateOne(req.body)
    res.status(200).json({ message: "subCategory updated Successfully", subCategory })
})

const deletesubCategory=catchError(async(req,res,next)=>{
    const subcategory=await SubCategory.findByIdAndDelete({_id:req.params.id},{new:true})
    if(!subcategory) return next(new AppError('subcategory not found',404))
    res.json({message:"subcategory is",subcategory})
})
export {addsubCategory,getAllsubCategory,getsubCategory,updatesubCategory,deletesubCategory}