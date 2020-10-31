const { query } = require('./util/hasura');

exports.handler = async () => {
    const { donations } = await query({
        query: `
            query {
                donations {
                    amount
                    email
                    id
                    initiativeId
                    time
                }
            }
          
        `
    });
    return {
        statusCode: 200,
        body: JSON.stringify(donations)
    }
}