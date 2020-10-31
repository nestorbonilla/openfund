const lessToJson = require('less-to-json');

module.exports = {
    siteMetadata: {
        title: 'RxC Openfund',
        description: 'RadicalxChange Openfund platform',
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
      }      
    ]
}