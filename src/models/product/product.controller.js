import slugify from 'slugify';
import { catchError } from '../../middlewares/catchError.js';
import { AppError } from '../../utilis/AppError.js';
import { Product } from './../../../database/models/product.model.js';
import fs from 'fs'
import path from 'path';
import { APIFeatures } from './../../utilis/apiFeatures.js';
const addProduct = catchError(async (req, res, next) => {
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(ele => ele.filename)
    req.body.slug = slugify(req.body.title)
    const product = await Product.create(req.body)
    product.save()
    res.status(201).json({ message: "Product created successfully", product })
})

const getAllProducts = catchError(async (req, res, next) => {
    let apiFeatures = new APIFeatures(Product.find(), req.query).pagination().filter().sort().fields().search()
    let products = await apiFeatures.mongooseQuery
    if (!products) return next(new AppError('no subcategories found', 404))
    res.status(200).json({ message: "Products are", products })
})

const getProduct = catchError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new AppError('Product not found', 404))
    res.status(200).json({ message: "Product is", product })
})
const updateProduct = catchError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new AppError('product not found'))
    if (req.body.title) req.body.slug = slugify(req.body.title)
    if (req.files) {
        if (req.files.imageCover) {
            let filePath = path.join('uploads', 'products', `${product.imageCover.split('/')[5]}`)
            fs.unlinkSync(filePath)
            req.body.imageCover = req.files.imageCover[0].filename
        }
        if (req.files.images) {
            let imagesFilePath = product.images.map((ele) => ele.split('/')[5])
            imagesFilePath = imagesFilePath.map((ele) => path.join('uploads', 'products', `${ele}`))
            imagesFilePath.map(ele => fs.unlinkSync(ele))
            req.body.images = req.files.images.map(ele => ele.filename)
        }
    }
    await product.updateOne(req.body)
    res.status(200).json({ message: "Product updated Successfully" })
})

const deleteProduct = catchError(async (req, res, next) => {
    const product = await Product.findById({ _id: req.params.id })
    if (!product) return next(new AppError('Product not found', 404))
    let filePath = path.join('uploads', 'products', `${product.imageCover.split('/')[5]}`)
    fs.unlinkSync(filePath)
    let imagesFilePath = product.images.map((ele) => ele.split('/')[5])
    imagesFilePath = imagesFilePath.map((ele) => path.join('uploads', 'products', `${ele}`))
    imagesFilePath.map(ele => fs.unlinkSync(ele))
    await product.deleteOne()
    res.json({ message: "Product deleted successfully", product })

})
export { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct }