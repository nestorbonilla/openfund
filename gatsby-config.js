const lessToJson = require('less-to-json');
const fetch = require('node-fetch');
const { createHttpLink } = require('apollo-link-http')

module.exports = {
    siteMetadata: {
        title: 'RxC Openfund',
        description: 'RadicalxChange Openfund platform',
        url: 'https://openfund.netlify.app',
        author: 'Nestor Bonilla',
      },
    plugins: [
      'gatsby-plugin-emotion',
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-netlify-identity-widget',
      {
        resolve: 'gatsby-plugin-antd',
        options: {
            style: true
        }
      },
      {
        resolve: "gatsby-plugin-less",
        options: {
            lessOptions: {
            javascriptEnabled: true,
            modifyVars: lessToJson('src/theme/vars.less'),
            }
        }
      },
      {
        resolve: 'gatsby-plugin-react-svg',
        options: {
          rule: {
            include: /vectors/
          }
        }
      },
      {
        resolve: 'gatsby-plugin-webpack-bundle-analyzer',
        options: {
          production: true,
          disable: !process.env.ANALYZE_BUNDLE_SIZE,
          generateStatsFile: true,
          analyzerMode: 'static'
        }
      },
      {
        resolve: 'gatsby-source-graphql',
        options: {
          typeName: 'hasura',
          fieldName: 'hasura',
          createLink: () => {
            return createHttpLink({            
              uri: process.env.HASURA_API_URL,
              headers: {
                'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET
              },
              fetch
            })
          }
        }
      },
      {
        resolve: 'gatsby-plugin-social9-socialshare',
        options: {
          content:  '925a498975c14bfabc3c6db5e192b0a1',
          async:  true,
          defer:  true
        }
      }
    ]
}