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
            mutation ($amount: String!, $email: String!, $initiative: String!) {
                insert_donations_one(object: {amount: $amount, email: $email, initiative: $initiative}) {
                    amount
                    email
                    id
                    initiative
                    time
                }
            }
        `,
        variables: { amount, email, initiative }
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