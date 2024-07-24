import { deleteFiles } from "../helpers/deleteFiles.Erros.js"
export const globalError = (err, req, res, next) => {
    let code = err.statusCode || 500
    deleteFiles(err,req,res)
    res.status(code).json({ error: "Error", message: err.message, code })
}