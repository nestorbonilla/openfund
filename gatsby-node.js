exports.createPages = async ({ actions: { createPage }, graphql }) => {
  
  const result = await graphql(`
    {
      hasura {
        initiatives {
          id
          title
          description
        }
      }
    }
  `);

  const data = result.data.hasura.initiatives;
  console.log('initiative graphql ', data);

  data.forEach(item => {
    createPage({
      path: `/initiative/${item.id}/`,
      component: require.resolve('./src/templates/initiative'),
      context: {
        id: item.id
      }
    })
  })
}