import { globalError } from './src/middlewares/globalError.js'
import categoryRouter from './src/models/categoery/categoery.routes.js'
import subCategoryRouter from './src/models/subCategory/subCategoery.routes.js'
import brandRouter from './src/models/brand/brand.routes.js'
import productRouter from './src/models/product/product.routes.js'
import { AppError } from './src/utilis/AppError.js'
const bootstrap=(express,app)=>{
    app.use(express.json())
    app.use('/categories',categoryRouter)
    app.use('/subCategories',subCategoryRouter)
    app.use('/brands',brandRouter)
    app.use('/products',productRouter)
    app.use('*',(req,res,next)=>{
        next(new AppError(`routes not found at  ${req.originalUrl}`,404))
    })
    app.use(globalError)

}

export default bootstrap