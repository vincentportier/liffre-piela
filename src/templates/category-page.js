import React from "react"
import { graphql, Link } from "gatsby"

const categoryPageTemplate = ({ data }) => {
  console.log({ data })
  const posts = data.allMarkdownRemark.edges

  return (
    <div>
      <ol>
        {posts &&
          posts.map(post => {
            const title = post.node.frontmatter.title || post.node.fields.slug
            return (
              <li key={post.node.fields.slug}>
                <article>
                  <header>
                    <h2>
                      <Link to={post.node.fields.slug}>
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
    </div>
  )
}

export const pageQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { categories: { in: [$category] } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            author
            categories
            date(formatString: "MMMM DD, YYYY")
            description
            tags
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
export default categoryPageTemplate
