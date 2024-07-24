import fs from 'fs'
import path from 'path';
export  function deleteFiles(err,req,res){
    if (req.file&&(err.message!='Unexpected field')) { //if i upload multiple files problem happens
        const filePath = path.join('uploads', `${req.originalUrl.split('/')[1]}`, `${req.file.filename}`);
        fs.unlinkSync(filePath)
    }
    if (req.files&&(err.message!='Unexpected field')) {  //when the err message is Unexpected fields the files are not uploaded so the unlinksync is making an error
        if (req.files.imageCover) {
            let filePath = path.join('uploads',`${req.originalUrl.split('/')[1]}`,`${req.files.imageCover[0].filename}`)
            if (filePath) fs.unlinkSync(filePath)
        }
        if (req.files.images) {
            let imagesFilePath = req.files.images.map((ele) => ele.filename)
            imagesFilePath = imagesFilePath.map((ele) => path.join('uploads', `${req.originalUrl.split('/')[1]}`, `${ele}`))
            imagesFilePath.map(ele => fs.unlinkSync(ele))
        }
    }
}