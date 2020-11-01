const { query } = require('./util/hasura');

exports.handler = async () => {
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
    return {
        statusCode: 200,
        body: JSON.stringify(donations)
    }
}