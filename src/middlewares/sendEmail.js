import nodemailer from 'nodemailer'
import { htmlEmail } from './emailHtml.js';
import jwt from 'jsonwebtoken'
export const sendEmail=async (email)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: "mohamedahmed.elassal@gmail.com",
          pass: "urjsmuswqnyqxmiu",
        },
      });
    jwt.sign({email},'MyNameIsMohamed',(err,token)=>{
        if(err) return res.json({message:"invalid email",err})
        const info = transporter.sendMail({
            from: '"Mohamed Elassal" <mohamedahmed.elassal@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Job Offer", // Subject line
            text: "you are accepted", // plain text body
            html: htmlEmail(token)
            });
        
          console.log("Message sent: %s", info.messageId);
    })
    
}