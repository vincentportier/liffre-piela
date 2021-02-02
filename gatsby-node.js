exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blog-post.js`)

  const CategoryPageTemplate = require.resolve(
    `./src/templates/category-page.js`
  )

  const _ = require("lodash")

  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/blog/" } }
      ) {
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

  const posts = result.data.posts.edges
  const categories = []

  // loop through all the posts and push all the categories
  posts &&
    posts.forEach(({ node }) => {
      node.frontmatter.categories.forEach(cat => categories.push(cat))
    })

  // count the amount of articles per category
  const countCategories = categories.reduce((prev, curr) => {
    prev[curr] = (prev[curr] || 0) + 1
    return prev
  }, {})

  // get each unique category

  const allCategories = Object.keys(countCategories)

  // Create a page per blog post

  posts.forEach(({ node }, index) => {
    const nextPostId = index === 0 ? null : posts[index - 1].node.id
    const previousPostId =
      index === posts.length - 1 ? null : posts[index + 1].node.id

    createPage({
      path: `blog${node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        id: node.id,
        index,
        nextPostId,
        previousPostId,
      },
    })
  })

  // create the blog list pages

  const BlogPageTemplate = require.resolve(`./src/templates/blog.js`)

  const postsPerPage = 9
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/page/${i + 1}`,
      component: BlogPageTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        currentPage: i + 1,
        numPages,
        countCategories,
        allCategories,
      },
    })
  })

  // create the categories pages

  allCategories.forEach((cat, i) => {
    const link = `/blog/category/${_.kebabCase(cat)}`
    const numPages = Math.ceil(countCategories[cat] / postsPerPage)
    Array.from({
      length: numPages,
    }).forEach((_, i) => {
      createPage({
        path: i === 0 ? link : `${link}/page/${i + 1}`,
        component: CategoryPageTemplate,
        context: {
          allCategories: allCategories,
          category: cat,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          numPages,
          count: countCategories[cat],
          countCategories,
          allCategories,
        },
      })
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
