const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
// about Page
router.get('/', (req, res) => res.render('contact'));
router.post("/", function(request, response) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "un.don.un.sourire13@gmail.com", // this should be YOUR GMAIL account
            pass: "UnDonUnSourire13" // this should be your password
        }
    });

    var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
    var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${request.body.name} <br> Email : <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
    var mail = {
        from: "un.don.un.sourire13@gmail.com",
        to: "un.don.un.sourire13@gmail.com",
        subject: "Mail From Contact Form",
        text: textBody,
        html: htmlBody
    };

    transporter.sendMail(mail, function (err, info) {
        if(err) {
            console.log(err);
            response.json({error : err})
        }
        else {
            response.json({message : "message envoyé avec succées"})       }
    });
});

module.exports = router;
