import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

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
          <Link to={`/category/${category}`}>{category} test</Link>
        </p>
      ))}
    </div>
  )
}

export default Categories
