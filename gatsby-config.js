/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `Liffre-Piela`,
    siteUrl: `https://www.liffre-piela.netlify.app`,
    description: `Association d'aide humanitaire et de coopération avec Piela (Burkina Faso)`,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    `gatsby-plugin-react-helmet`,
  ],
}
