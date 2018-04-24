
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "joshjanculawebpage@gmail.com",
    auth: {
        user: "jamclashwebpage@gmail.com",
        pass: "gmailPassword"
    }
});

module.exports = function(app, flag) {
 
app.get('/',function(req,res){
    res.sendfile('index.html');
});
app.get('/send',function(req,res){
    
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        html : req.query.html,
        attachments : [
            {   // stream as an attachment
            filename: "new.png",
            filePath: new Buffer(req.query.attachments)
            // filePath: req.query.attachments
           
        },
            ]
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
           
        res.end("sent");
         }
});
});
}