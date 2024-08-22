import { connect} from "mongoose";
export const dbConnection=connect('mongodb+srv://mohamed:Mohamed123@atlascluster.7f7kh.mongodb.net/Ecommerce').
then(()=>console.log('db connected')).catch((err)=>console.log(err))