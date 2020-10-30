const initiatives = require('../data/initiatives.json');

exports.handler = async ({ queryStringParameters }) => {
    const { id } = queryStringParameters;
    const initiative = initiatives.find((i) => i.id === id);

    if (!initiative) {
        return {
            statusCode: 404,
            body: 'Not found'
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(initiative)
    }
}