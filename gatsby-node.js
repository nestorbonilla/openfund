exports.createPages = async ({ actions: { createPage }, graphql }) => {
  
  const result = await graphql(`
    {
      hasura {
        initiatives {
          id
          title
          category
          description
          status
          deadline
          goal
          fbUrl
          igUrl
          webUrl
          mainImage
          sumOfRoots
          pledgeAmount
        }
      }
    }
  `);

  const data = result.data.hasura.initiatives;

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