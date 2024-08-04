process.on('uncaughtException',(err)=>{
    console.log("error",err)
})
import dotenv from 'dotenv'
import fs from 'fs'
import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import bootstrap from './bootstrap.js';
const app = express()
const port = 3000
app.use('/uploads',express.static('uploads'))
bootstrap(express,app)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`app listening on port ${port}!`))
dotenv.config()
process.on('unhandledRejection',(err)=>{
    console.log("error",err)
})
