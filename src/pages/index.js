import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import { Fragment } from "react"
import Categories from "../components/categories"
import Layout from "../components/layout"

const Home = ({ data }) => {
  const posts = data.allMarkdownRemark.edges

  if (posts.length === 0) {
    return (
      <Fragment>
        <SEO title="All posts" />
        <p>No blog posts found.</p>
      </Fragment>
    )
  }

  return (
    <Layout>
      <SEO title="All posts" />
      <h1>Liffre Piela blog</h1>
      <Categories />
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

export default Home

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      limit: 1000
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`
