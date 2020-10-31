const stripe = require('stripe')(process.env.STRIPE_API_SECRET);
const inventory = require('../data/products.json');

exports.handler = async ({ body }) => {
    const { sku, quantity } = JSON.parse(body);
    const product = inventory.find((p) => p.sku === "RXC001");

    const session = await stripe.checkout.sessions.create({
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
                name: 'Donation',
              },
              unit_amount: 2000,
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