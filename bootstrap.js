import { globalError } from './src/middlewares/globalError.js'
import categoryRouter from './src/models/categoery/categoery.routes.js'
import subCategoeryRouter from './src/models/subCategory/subCategoery.routes.js'
import brandRouter from './src/models/brand/brand.routes.js'
const bootstrap=(express,app)=>{
    app.use(express.json())
    app.use('/categories',categoryRouter)
    app.use('/subCategories',subCategoeryRouter)
    app.use('/brands',brandRouter)
    app.use(globalError)

}

export default bootstrap