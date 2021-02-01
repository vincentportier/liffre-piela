import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import Img from "gatsby-image"
import Layout from "../components/layout"
import styled from "styled-components"
import IconLogo from "../components/icons/logo"

const StyledArticle = styled.article`
  a {
    text-decoration: underline;
    transition: var(--transition);
  }
  a:hover {
    color: var(--primary);
  }
`
const StyledHeader = styled.header`
  a {
    text-decoration: underline;
    color: var(--text-secondary);
  }

  h1 {
    margin-bottom: 0;
  }
  p {
    color: var(--text-secondary);
    font-style: italic;
  }
  .image-container {
    margin-bottom: 2rem;
  }
`

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter}
  margin-top:2rem;
  border-top: 1px solid rgba(1, 1, 1, 0.2);
  padding: 1rem;

  div {
    ${({ theme }) => theme.mixins.flexCenter}

    @media (max-width:480px) {
      flex-wrap: wrap;
    }

    p {
      margin: 0;
      font-style: italic;
      text-align: center;
      color: var(--text-secondary);
      font-size: var(--fz-md);
    }
  }

  svg {
    width: 200px;
    min-width: 75px;
    margin: 2rem;

    @media (max-width: 480px) {
      width: 100px;
    }
  }
`

const StyledBlogNav = styled.nav`
  ${({ theme }) => theme.mixins.flexCenter}
  margin-top:2rem;
  ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    list-style: none;
    .next {
      text-align: right;
    }
    li {
      font-size: var(--fz-sm);
      width: 40%;
      p {
        font-style: italic;
        color: var(--text-secondary);
        margin-bottom: 0;
      }
    }
  }
`

const BlogPostTemplate = ({ data, pageContext }) => {
  console.log(pageContext.categories)
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
      <StyledArticle>
        <StyledHeader>
          <Link to="/blog">BLOG</Link>
          <h1>{post.frontmatter.title}</h1>
          <p>Liffre Piela, {post.frontmatter.date}</p>

          {featuredImgFluid && (
            <div className="image-container">
              <Img
                fluid={featuredImgFluid}
                alt="featured-image"
                className="img"
              ></Img>{" "}
            </div>
          )}
        </StyledHeader>
        <section dangerouslySetInnerHTML={{ __html: post.html }}></section>
      </StyledArticle>

      <StyledFooter>
        <div>
          <IconLogo />
          <p>
            L’association Liffré Piéla vient en aide à la région defavorisée de
            Piéla située au Nord du Burkina Faso. Elle intervient nottamment
            dans les domaines de la lutte contre la faim, l'accès à l’eau
            potable, à l’éducation et à l’instruction.
          </p>
        </div>
      </StyledFooter>

      <StyledBlogNav>
        <ul>
          <li className="previous">
            {previous && (
              <div>
                <p>← Article précédent</p>
                <Link to={`/blog${previous.fields.slug}`} rel="prev">
                  {previous.frontmatter.title}
                </Link>
              </div>
            )}
          </li>
          <li className="next">
            {next && (
              <div>
                <p>Article suivant →</p>
                <Link to={`/blog${next.fields.slug}`} rel="next">
                  {next.frontmatter.title}
                </Link>
              </div>
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
            fluid(maxWidth: 1600) {
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
