const { query } = require('./util/hasura');

exports.handler = async () => {
    const { donations } = await query({
        query: `
            query {
                donations {
                    id
                    amount
                    email
                    initiative
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