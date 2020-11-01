const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
//const inventory = require('../data/products.json');

exports.handler = async ({ body }) => {
    const { initiative, email, amount, image } = JSON.parse(body);
    //console.log('email ', email);
    //console.log('amount ', amount);
    //const product = inventory.find((p) => p.sku === "RXC001");

    const session = await stripe.checkout.sessions.create({
        customer_email: email,
        submit_type: 'donate',
        billing_address_collection: 'auto',
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
        },
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: initiative,
                description: 'RadicalxChange Quadratic fund donation.',
                images: [image],

              },
              unit_amount: Number.parseInt(amount) * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://openfund.netlify.app/success',
        cancel_url: 'https://openfund.netlify.app/',
      });
    
    return {
        statusCode: 200,
        body: JSON.stringify({ sessionId: session.id })
    }
}