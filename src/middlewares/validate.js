import { AppError } from './../utilis/AppError.js';
export const validate = (schema) => {
    return async (req, res, next) => {
    let inputData={ ...req.body, ...req.params,...req.query }
    if(req.file){
        inputData.file={...req.file}
    }
    if(req.files){
            inputData.files={...req.files}
    }
    let { error } = schema.validate(inputData, { abortEarly: false })
    if (!error) {
        next()
    } else {
        let errMsgs = error.details?.map(err => err.message)
        next(new AppError(errMsgs, 401))
    }
}
}
