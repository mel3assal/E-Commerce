import bcrypt from "bcryptjs"
import { User } from "../../databases/Models/user.model.js"
const checkEmail = async (req, res, next) => {
    const isFound = await User.findOne({ email: req.body.email })
    if (isFound) return res.status(409).json({ message: "user already exists" })
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    next()
}
export default checkEmail
