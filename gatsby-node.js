exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = require.resolve(`./src/templates/blog-post.js`)
  const categoryPageTemplate = require.resolve(
    `./src/templates/category-page.js`
  )
  const _ = require("lodash")
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              categories
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges

  if (posts.length > 0) {
    posts.forEach(({ node }, index) => {
      const nextPostId = index === 0 ? null : posts[index - 1].node.id
      const previousPostId =
        index === posts.length - 1 ? null : posts[index + 1].node.id

      createPage({
        path: `blog${node.fields.slug}`,
        component: blogPostTemplate,
        context: {
          // additional data can be passed via context
          id: node.id,
          index,
          nextPostId,
          previousPostId,
        },
      })
    })
  }

  const categoriesFound = []
  posts.forEach(post => {
    post.node.frontmatter.categories &&
      post.node.frontmatter.categories.forEach(cat => {
        if (categoriesFound.indexOf(cat) === -1) {
          categoriesFound.push(cat)
        }
      })
  })

  categoriesFound.forEach(cat => {
    createPage({
      path: `blog/category/${_.kebabCase(cat)}`,
      component: categoryPageTemplate,
      context: {
        category: cat,
      },
    })
  })
}

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode,
    })

    createNodeField({
      node,
      name: `slug`,
      value,
    })
  }
}
