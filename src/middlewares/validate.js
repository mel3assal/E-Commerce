import { AppError } from './../utilis/AppError.js';
export const validate = (schema) => {
    return async (req, res, next) => {
        let files = () => {
            if (req.file) {
                let { fieldname } = req.file
                return { fieldname: req.file }
            }
        if (req.files) {
            return { images: req.files }
        }
    }
    let { error } = schema.validate({ ...files(), ...req.body, ...req.params }, { abortEarly: false })
    if (!error) {
        next()
    } else {
        let errMsgs = error.details?.map(err => err.message)
        next(new AppError(errMsgs, 401))
    }

}
}
