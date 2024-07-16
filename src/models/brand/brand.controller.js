import slugify from 'slugify';
import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
import { Brand } from './../../../database/models/brand.model.js';
const addBrand=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const brand=await Brand.create(req.body)
    brand.save()
    res.status(201).json({message:"Brand created successfully",brand})
})

const getAllBrands=catchError(async(req,res,next)=>{
    const Brands=await Brand.find()
    if(!Brands) return next(new AppError('no subcategories found',404))
    res.status(200).json({message:"Brands are",Brands})
})

const getBrand=catchError(async(req,res,next)=>{
    const brand=await Brand.findById(req.params.id)
    if(!brand) return next(new AppError('Brand not found',404))
    res.status(200).json({message:"Brand is",brand})
})
const updateBrand=catchError(async(req,res,next)=>{
    req.body.slug=slugify(req.body.name)
    const brand=await Brand.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!brand) return next(new AppError('Brand not found ',404))
    res.status(200).json({message:"Brand updated Successfully",brand})
})

const deleteBrand=catchError(async(req,res,next)=>{
    const brand=await Brand.findByIdAndDelete({_id:req.params.id},{new:true})
    if(!brand) return next(new AppError('Brand not found',404))
    res.json({message:"Brand delted successfully",brand})
})
export {addBrand,getAllBrands,getBrand,updateBrand,deleteBrand}