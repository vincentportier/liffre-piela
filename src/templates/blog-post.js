import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import Img from "gatsby-image"
import Layout from "../components/layout"
import styled from "styled-components"
import IconLogo from "../components/icons/logo"
import _ from "lodash"

const StyledArticle = styled.article`
  .blog-link {
    margin-top: 2rem;
  }
  a {
    text-decoration: underline;
    transition: var(--transition);
  }
  a:hover {
    color: var(--primary);
  }
  section {
    img {
      display: block;
      width: 100%;
      object-fit: contain;
    }
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
  ul {
    display: flex;
    align-items: center;
    text-decoration: none;
    list-style-type: none;
    flex-wrap: wrap;

    li {
      background: var(--primary);
      color: var(--white);
      border-radius: var(--border-radius);
      padding: 2px 6px;
      margin: 10px 10px 0 0;
      font-size: var(--fz-xxs);
      transition: var(--transition);
      &:hover {
        opacity: 0.75;
      }
      a {
        text-decoration: none;
        color: var(--white);
        &:hover {
          color: var(--white);
        }
      }
    }
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

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const { next, previous } = data

  let featuredImgFluid = post.frontmatter.featuredImage
    ? post.frontmatter.featuredImage.childImageSharp.fluid
    : null

  return (
    <Layout location={location}>
      <SEO
        title={`${post.frontmatter.title} - Liffré Piéla`}
        description={post.frontmatter.description}
        article={true}
        image={
          post.frontmatter.featuredImage ? post.frontmatter.featuredImage : null
        }
      />
      <div className="no-banner">
        <StyledArticle>
          <StyledHeader>
            <Link to="/blog" className="blog-link">
              BLOG
            </Link>
            <h1>{post.frontmatter.title}</h1>
            <p>Liffre Piela, {post.frontmatter.date}</p>
            {post.frontmatter.categories && (
              <ul>
                {post.frontmatter.categories.map(cat => (
                  <li>
                    <Link to={`/blog/category/${_.kebabCase(cat)}`}>{cat}</Link>
                  </li>
                ))}
              </ul>
            )}
            {featuredImgFluid && (
              <div className="image-container">
                <Img
                  fluid={featuredImgFluid}
                  alt={`featured image - ${post.frontmatter.featuredImage.name}`}
                  className="img"
                ></Img>
              </div>
            )}
          </StyledHeader>
          <section dangerouslySetInnerHTML={{ __html: post.html }}></section>
        </StyledArticle>
      </div>
      <StyledFooter>
        <div>
          <IconLogo />
          <p>
            L’association Liffré Piéla vient en aide à la région defavorisée de
            Piéla située au Nord du Burkina Faso. Elle intervient notamment dans
            les domaines de la lutte contre la faim, l'accès à l’eau potable, à
            l’éducation et à l’instruction.
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        featuredImage {
          name
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
