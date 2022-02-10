const sgMail = require('@sendgrid/mail')
const sendgridAPIKEY='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'
sgMail.setApiKey(sendgridAPIKEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'pc29564530@gmail.com',
        subject:'Thanks for joining in',
        text:`Welcome to the app, ${name}. Let me know how you get along  with this`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to:email,
        from:'pc29564530@gmail.com',
        subject:'Feedback',
        text:'Give us a feedback, ${name}. Let us know you have discountinue  a account'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}