require('dotenv').config()

const password = process.env.password;

// eslint-disable-next-line import/no-anonymous-default-export
export default function (req, res) {
    
    console.log('req.body in sendEmail', req.body)

    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
      user: 'sardarbuildingcompanysendemail@gmail.com',
      pass: password,
    },
    secure: true,
    });

    const mailData = {
        from: 'sardarbuildingcompanysendemail@gmail.com',
        to: 'sardarbuildingcompany@gmail.com',
        subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: `<div>${req.body.message}</div><p>Sent from:
    ${req.body.email}</p>`
    }

       transporter.sendMail(mailData, function (err, info) {
        if(err)
        console.log(err)
        else
          console.log('info', info)
    })
    res.status(200).json({message: 'success'}) 
}