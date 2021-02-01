import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

const uncategorizedPageTemplate = ({ data }) => {
  let posts = data.allMarkdownRemark.edges
  posts = posts.filter(post => {
    if (post.node.frontmatter.categories === null) return true
    if (post.node.frontmatter.categories.length === 0) return true
    return false
  })

  if (posts.length === 0)
    return <Layout>Il n'y a pas d'articles dans cette catégorie</Layout>

  return (
    <Layout>
      <ol>
        {posts &&
          posts.map(post => {
            const title = post.node.frontmatter.title || post.node.fields.slug
            return (
              <li key={post.node.fields.slug}>
                <article>
                  <header>
                    <h2>
                      <Link to={`/blog${post.node.fields.slug}`}>
                        <span>{title}</span>
                      </Link>
                    </h2>
                    <small>{post.node.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          post.node.frontmatter.description ||
                          post.node.excerpt,
                      }}
                    ></p>
                  </section>
                </article>
              </li>
            )
          })}
      </ol>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            categories
            date(formatString: "MMMM DD, YYYY")
            description
            title
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
export default uncategorizedPageTemplate
