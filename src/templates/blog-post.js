import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import Img from "gatsby-image"
import Layout from "../components/layout"
import styled from "styled-components"

const StyledHeader = styled.header``
const StyledFeaturedImage = styled.div`
  position: relative;
  max-width: 500px;
  margin: 50px auto 50px auto;
  @media (max-width: 768px) {
    margin: 50px auto 50px;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;

    width: 100%;
    border-radius: var(--border-radius);

    .img {
      position: relative;
      border-radius: var(--border-radius);
    }
  }
`
const StyledBlogNav = styled.nav`
  ${({ theme }) => theme.mixins.flexCenter}
  ul {
    color: var(--primary);
    margin-top: 50px;
    padding: 0 20px;
    width: 100%;
    ${({ theme }) => theme.mixins.flexBetween}
    list-style: none;
    small {
      display: block;
      color: var(--text-secondary);
    }
  }
`

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { next, previous } = data

  let featuredImgFluid = post.frontmatter.featuredImage
    ? post.frontmatter.featuredImage.childImageSharp.fluid
    : null

  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        article={true}
      />
      <article>
        <StyledHeader>
          <Link to="/blog">
            <small>BLOG</small>
          </Link>

          {featuredImgFluid && (
            <StyledFeaturedImage>
              <div className="wrapper">
                <Img
                  fluid={featuredImgFluid}
                  alt="featured-image"
                  className="img"
                ></Img>
              </div>
            </StyledFeaturedImage>
          )}
          <h1>{post.frontmatter.title}</h1>
          <p>Liffre Piela, {post.frontmatter.date}</p>
        </StyledHeader>
        <section dangerouslySetInnerHTML={{ __html: post.html }}></section>
      </article>
      <footer></footer>
      <StyledBlogNav>
        <ul>
          <li>
            {previous && (
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                <div>
                  <small>précédent</small>
                  <span>← {previous.frontmatter.title}</span>
                </div>
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
                <div>
                  <small style={{ textAlign: "right" }}>suivant</small>

                  <span>{next.frontmatter.title} →</span>
                </div>
              </Link>
            )}
          </li>
        </ul>
      </StyledBlogNav>
    </Layout>
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
            fluid(maxHeight: 800) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        title
        description
        date(formatString: "MMMM DD, YYYY")
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
