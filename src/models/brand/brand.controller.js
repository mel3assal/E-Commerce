import slugify from 'slugify';
import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
import { Brand } from './../../../database/models/brand.model.js';
import fs from 'fs'
import path from 'path';
import { APIFeatures } from './../../utilis/apiFeatures.js';
const addBrand = catchError(async (req, res, next) => {
    req.body.logo = req.file.filename
    req.body.slug = slugify(req.body.name)
    const brand = await Brand.create(req.body)
    brand.save()
    res.status(201).json({ message: "Brand created successfully", brand })
})

const getAllBrands = catchError(async (req, res, next) => {
    let apiFeatures=new APIFeatures(Brand.find(),req.query).pagination().search().fields().filter().sort()
    let brands=await apiFeatures.mongooseQuery
    if (!brands) return next(new AppError('no subcategories found', 404))
    res.status(200).json({ message: "Brands are", brands })
})

const getBrand = catchError(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id)
    if (!brand) return next(new AppError('Brand not found', 404))
    res.status(200).json({ message: "Brand is", brand })
})
const updateBrand = catchError(async (req, res, next) => {
    const brand = await Brand.findById(req.params.id)
    if (!brand) return next(new AppError('Brand not found', 404))//there is problem adding the photo to upload file even if not found
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) {
        req.body.logo = req.file.filename
        const filePath = path.join('uploads', 'brands', `${brand.logo.split('/')[5]}`);
        fs.unlinkSync(filePath)
    }
    await brand.updateOne(req.body)
    res.status(200).json({ message: "Brand updated Successfully", brand })
})

const deleteBrand = catchError(async (req, res, next) => {
    const brand = await Brand.findById({ _id: req.params.id })
    if (!brand) return next(new AppError('Brand not found', 404))
    const filePath = path.join('uploads', 'brands', `${brand.logo.split('/')[5]}`);
    fs.unlinkSync(filePath)
    await brand.deleteOne()
    res.json({ message: "Brand delted successfully", brand })
})
export { addBrand, getAllBrands, getBrand, updateBrand, deleteBrand }