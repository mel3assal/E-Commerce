import { AppError } from "../utilis/AppError.js"

export function catchError(fn){
    return (req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            next(new AppError(err,500))
        })
    }
}