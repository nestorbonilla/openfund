require('dotenv').config();
const { query } = require('./util/hasura');

exports.handler = async (event) => {
    const mailgun = require('mailgun-js');
    const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });

    const { amount, email, id, initiativeId, time } = JSON.parse(event.body);

    const result = await query({
        query: `
            mutation ($amount: String!, $email: String!, $id: String!, $initiativeId: String!, $time: String!) {
                insert_donations_one(object: {amount: $amount, email: $email, id: $id, initiativeId: $initiativeId, time: $time}) {
                    amount
                    email
                    id
                    initiativeId
                    time
                }
            }
        `,
        variables: { amount, email, id, initiativeId, time }
    });
    
    const emailToSend = {
        from: 'Nestor Bonilla <nestor.bonilla.s@gmail.com>',
        to: `Funder <${email}>`,
        subject: 'Openfund donation succesfull',
        text: 'Thanks for your donation.'
    };
    mg.messages().send(emailToSend, (error, response) => {
        console.log(response);
    })

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}