const nodemailer = require('nodemailer');
function  mailsender(email, htmlstr){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'letswincovidvaccineinfo@gmail.com',
            pass: 'NewProject123'
        }
    });
    
    const mailOptions = {
        from: 'letswincovidvaccineinfo@gmail.com',
        to: email,
        subject: '[IMPORTANT] Covid vaccine info based on your location...',
        html: htmlstr
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    return;
}

module.exports={mailsender}