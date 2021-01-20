import React, { useEffect } from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import Img from "gatsby-image"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { next, previous } = data

  console.log(pageContext)

  let featuredImgFluid = post.frontmatter.featuredImage
    ? post.frontmatter.featuredImage.childImageSharp.fluid
    : null

  return (
    <div>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        article={true}
      />
      <article>
        <header>
          {featuredImgFluid && (
            <Img fluid={featuredImgFluid} alt="featured-image"></Img>
          )}
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }}></section>
      </article>
      <footer></footer>
      <nav>
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  )
}

export const pageQuery = graphql`
  query($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        title
        description
        date(formatString: "MMMM DD, YYYY")
        tags
        categories
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
    }
  }
`
export default BlogPostTemplate
