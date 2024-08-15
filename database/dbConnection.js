import { connect} from "mongoose";
export const dbConnection=connect('mongodb://localhost:27017/E-commerce').
then(()=>console.log('db connected')).catch((err)=>console.log(err))