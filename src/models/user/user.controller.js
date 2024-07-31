import { User } from '../../../database/models/user.model.js';
import { catchError } from './../../middlewares/catchError.js';
import { AppError } from './../../utilis/AppError.js';
import { APIFeatures } from './../../utilis/apiFeatures.js';
const addUser = catchError(async (req, res, next) => {
    const user = await User.create(req.body)
    user.save()
    res.status(201).json({ message: "User created successfully", user })

})

const getAllUsers = catchError(async (req, res, next) => {
    let apiFeatures = new APIFeatures(User.find(), req.query).pagination().filter().fields().search().sort()
    let users = await apiFeatures.mongooseQuery
    if (!users) return next(new AppError('no users found', 404))
    res.status(200).json({ message: "users are", users })
})

const getUser = catchError(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) return next(new AppError('User not found', 404))
    res.status(200).json({ message: "User is", user })
})
const updateUser = catchError(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if (!user) return next(new AppError('user not found ', 404))
    res.json({ message: "user updated successfully", user })
})

const deleteUser = catchError(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return next(new AppError('user not found ', user))
    res.json({ message: 'user not found ', user })
})
export { addUser, getAllUsers, getUser, updateUser, deleteUser }