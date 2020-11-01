const { query } = require('./util/hasura');

exports.handler = async ( event ) => {
    const { email } = JSON.parse(event.body);
    const { donations } = await query({
        query: `
            query {
                donations {
                    amount
                    email
                    id
                    initiative
                    time
                }
            }
          
        `
    });
    const donationsByEmail = donations.find((d) => d.email === email);

    if (!donationsByEmail) {
        return {
            statusCode: 404,
            body: 'Not found'
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(donationsByEmail)
    }
}