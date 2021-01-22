import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import _ from "lodash"

const Categories = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              categories
            }
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.edges
  const categoriesFound = []
  posts.forEach(post => {
    post.node.frontmatter.categories &&
      post.node.frontmatter.categories.forEach(cat => {
        if (categoriesFound.indexOf(cat) === -1) {
          categoriesFound.push(cat)
        }
      })
  })

  return (
    <div>
      {categoriesFound.map(category => (
        <p>
          <Link to={`/blog/category/${_.kebabCase(category)}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        </p>
      ))}
      <Link to={`/blog/category/uncategorized`}>Uncategorized</Link>
    </div>
  )
}

export default Categories
