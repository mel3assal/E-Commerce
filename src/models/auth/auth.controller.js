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
    if(user&&bcrypt.compareSync(req.body.oldPassword,user.password)){
        await user.updateOne({password: bcrypt.hashSync(req.body.newPassword,8)})
        let token =jwt.sign({userId:user._id,role:user.role},'MyNameIsMohamed')
        return res.json({message:'success',token})
    }
    next(new AppError('invalid email or password',401))
})

export { signUp, signIn,changeUserPassword }