import { User } from './../../../database/models/user.model.js';
import { catchError } from './../../middlewares/catchError.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../../utilis/AppError.js';
import jwt from 'jsonwebtoken'
const signUp = catchError(async (req, res, next) => {
    let user = await User.create(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id, role: user.role }, 'MyNameIsMohamed')
    res.json({ message: "success", token })
})

const signIn = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(user.password, req.body.password)) {
        let token = jwt.sign({ userId: user._id, role: user.role }, 'MyNameIsMohamed')
        return res.json({ message: "success", token })
    }
    next(new AppError('invalid email or password ', 401))
})

const changeUserPassword = catchError(async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.oldPassword, user.password)) {
        await user.updateOne({ password: bcrypt.hashSync(req.body.newPassword, 8), passwordChangedAt: Date.now() })
        let token = jwt.sign({ userId: user._id, role: user.role }, 'MyNameIsMohamed')
        return res.json({ message: 'success', token })
    }
    next(new AppError('invalid email or password', 401))
})

const protectedRoutes = catchError(async (req, res, next) => {
    let { token } = req.headers
    let userPayLoad = null
    if (!token) return next(new AppError('token not provided'))
    jwt.verify(token, 'MyNameIsMohamed', (err, payload) => {
        if (err) return next(new AppError(err, 401))
        userPayLoad = payload
    })
    let user = await User.findById(userPayLoad.userId)
    if (!user) return next(new AppError('user not found ', 401))
    if (user.passwordChangedAt) {
        let time = parseInt(user.passwordChangedAt.getTime() / 1000)
        if (time > userPayLoad.iat) return next(new AppError('token is not valid please login', 401))
    }
    req.user = user
    next()
})
export { signUp, signIn, changeUserPassword, protectedRoutes }