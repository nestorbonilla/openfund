const { query } = require('./util/hasura');

exports.handler = async (event) => {
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
    

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}