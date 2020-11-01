//const initiatives = require('../data/initiatives.json');
const { query } = require('./util/hasura');

exports.handler = async () => {
    const { initiatives } = await query({
        query: `
            query {
                initiatives {
                    id
                    title
                    deadline
                    description
                    fbUrl
                    goal
                    igUrl
                    mainImage
                    status
                    webUrl
                    category
                }
            }
          
        `
    });
    return {
        statusCode: 200,
        body: JSON.stringify(initiatives)
    }
}