require('dotenv').config();
const { query } = require('./util/hasura');
const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const endpointSecret = 'whsec_q9RQngX24nG49RaT4P3nZIfHylKOPx9Y';

exports.handler = async ({ headers, body }) => {
    const sig = headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);    
    } catch (error) {
        return {
            statusCode: 400,
            body: `Webhook error: ${error.message}`
        };        
    }
    
    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;

            const { amount, email, initiative } = paymentIntent;
            amount = amount / 100;
            email = "nbonilla@digitabonds.org";
            initiative = "Testing";

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
                console.log('email response ', response);
            })

            console.log('session after purchase ', paymentIntent);
            //console.log('PaymentIntent was successful!');
        break;
            case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log('PaymentMethod was attached to a Customer!');
        break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return {
        statusCode: 200,
        body: 'todo'
    }
}

//intent content
// {
//     id: 'pi_1HiKy9LU78DObODVnMC4mu86',
//     object: 'payment_intent',
//     allowed_source_types: [ 'card' ],
//     amount: 6600,
//     amount_capturable: 0,
//     amount_received: 6600,
//     application: null,
//     application_fee_amount: null,
//     canceled_at: null,
//     cancellation_reason: null,
//     capture_method: 'automatic',
//     charges: {
//       object: 'list',
//       data: [ [Object] ],
//       has_more: false,
//       total_count: 1,
//       url: '/v1/charges?payment_intent=pi_1HiKy9LU78DObODVnMC4mu86'
//     },
//     client_secret: 'pi_1HiKy9LU78DObODVnMC4mu86_secret_zoWdVrfWpzIEUbGliDodg4eZA',
//     confirmation_method: 'automatic',
//     created: 1604154133,
//     currency: 'usd',
//     customer: 'cus_IIwsOslam9pKV6',
//     description: null,
//     invoice: null,
//     last_payment_error: null,
//     livemode: false,
//     metadata: {},
//     next_action: null,
//     next_source_action: null,
//     on_behalf_of: null,
//     payment_method: 'pm_1HiKyXLU78DObODVdFxJ88OW',
//     payment_method_options: {
//       card: {
//         installments: null,
//         network: null,
//         request_three_d_secure: 'automatic'
//       }
//     },
//     payment_method_types: [ 'card' ],
//     receipt_email: null,
//     review: null,
//     setup_future_usage: null,
//     shipping: {
//       address: {
//         city: 'j',
//         country: 'US',
//         line1: 'josfj',
//         line2: 'oj',
//         postal_code: '343',
//         state: 'FL'
//       },
//       carrier: null,
//       name: 'asdfoi',
//       phone: null,
//       tracking_number: null
//     },
//     source: null,
//     statement_descriptor: null,
//     statement_descriptor_suffix: null,
//     status: 'succeeded',
//     transfer_data: null,
//     transfer_group: null
//   }