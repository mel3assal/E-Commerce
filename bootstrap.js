import { globalError } from './src/middlewares/globalError.js'
import categoryRouter from './src/models/categoery/categoery.routes.js'
import subCategoryRouter from './src/models/subCategory/subCategoery.routes.js'
import brandRouter from './src/models/brand/brand.routes.js'
import productRouter from './src/models/product/product.routes.js'
import userRouter from './src/models/user/user.routes.js'
import { AppError } from './src/utilis/AppError.js'
import authRouter from './src/models/auth/auth.routes.js'
import ReviewRouter from './src/models/review/review.routes.js'
import wishListRouter from './src/models/wishlist/wishList.routes.js'
import addressesRouter from './src/models/address/address.routes.js'
import couponRouter from './src/models/coupon/coupon.routes.js';
import cartRouter from './src/models/cart/cart.routes.js'
const bootstrap=(express,app)=>{
    app.use(express.json())
    app.use('/categories',categoryRouter)
    app.use('/subCategories',subCategoryRouter)
    app.use('/brands',brandRouter)
    app.use('/products',productRouter)
    app.use('/users',userRouter)
    app.use('/auth',authRouter)
    app.use('/reviews',ReviewRouter)
    app.use('/wishList',wishListRouter)
    app.use('/addresses',addressesRouter)
    app.use('/coupons',couponRouter)
    app.use('/carts',cartRouter)
    app.use('*',(req,res,next)=>{
        next(new AppError(`routes not found at  ${req.originalUrl}`,404))
    })
    app.use(globalError)

}

export default bootstrap