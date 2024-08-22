process.on('uncaughtException',(err)=>{
    console.log("error",err)
})
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import bootstrap from './bootstrap.js';
const app = express()
const port = process.env.port||3000
app.use(cors())
app.use('/uploads',express.static('uploads'))
bootstrap(express,app)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app  listening on port   ${port}!`))
dotenv.config()
process.on('unhandledRejection',(err)=>{
    console.log("error",err)
})
