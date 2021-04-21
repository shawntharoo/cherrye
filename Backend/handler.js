const AWS = require('aws-sdk');
const SES = new AWS.SES();

const FROM_EMAIL_ADDRESS = process.env.FROM_EMAIL_ADDRESS;
const TO_EMAIL_ADDRESS = process.env.TO_EMAIL_ADDRESS;

function sendEmailToMe(formData) {
    const emailParams = {
        Source: FROM_EMAIL_ADDRESS,
        ReplyToAddresses: ['cherryesalesteam@gmail.com'],
        Destination: {
            ToAddresses: [TO_EMAIL_ADDRESS],
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: `You have got a message from: ${formData.firstname} + ${formData.lastname}\n\n 
                    whose holding the email address of ${formData.email}. And the message is \n ${formData.message}`,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `New message from ${formData.firstname}`,
            },
        },
    };

    const promise = SES.sendEmail(emailParams).promise();
    return promise
}

exports.sendEmail = async(event) => {

    const dynamodb = event.Records[0].dynamodb;

    const cId = dynamodb.NewImage.contactid.S;
    const firstname = dynamodb.NewImage.firstname.S;
    const lastname = dynamodb.NewImage.lastname.S;
    const email = dynamodb.NewImage.email.S;
    const message = dynamodb.NewImage.message.S;
    const formData = {
        cId,
        firstname,
        lastname,
        email,
        message
    }

    return sendEmailToMe(formData).then(data => {
        console.log(data);
    }).catch(error => {
        console.log(error);
    });
}