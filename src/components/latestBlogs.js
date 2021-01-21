import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"
import _ from "lodash"

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;

  .section-title {
    font-size: 35px;
  }
  .section-subtitle {
    font-size: 25px;
    color: var(--text-secondary);
  }
`

const StyledGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
`

const StyledCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow}
  margin-top: 25px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 40% 1fr;
  height: 300px;

  @media (max-width: 768px) {
    height: auto;
    grid-template-columns: 1fr;
  }

  .gatsby-image-wrapper {
    height: 300px;
    @media (max-width: 768px) {
      height: 200px;
    }
  }

  .card-content {
    display: flex;
    flex-direction: column;
    padding: 15px 25px;
    width: 100%;
  }

  h2 {
    font-size: 30px;
    margin-top: 10px;
  }

  p {
    margin: 15px 0 15px 0;
    font-size: var(--fz-md);
  }

  small {
    a {
      color: var(--text-secondary);
      transition: var(--transition);
      &:hover {
        text-decoration: underline;
      }
    }
  }

  ul {
    margin-top: 5px;
    list-style: none;

    li {
      background: var(--primary);
      color: var(--white);
      border-radius: var(--border-radius);
      padding: 2px 8px;
      font-size: var(--fz-xxs);
      margin-right: 10px;
    }
  }

  .full-article-button {
    margin: auto 0 0 auto;
    text-align: right;
    color: var(--text-secondary);
    font-size: var(--fz-lg);
    &:hover {
      text-decoration: underline;
    }
  }
`

const LatestBlogs = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
      ) {
        edges {
          node {
            frontmatter {
              categories
              date(formatString: "MMMM DD, YYYY")
              description
              title
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.edges

  return (
    <StyledSection>
      <h2 className="section-title">Derniers articles</h2>
      <p className="section-subtitle">Retrouvez l'actualité de l'association</p>
      <StyledGrid>
        {posts &&
          posts.map(post => {
            const {
              title,
              description,
              categories,
              date,
            } = post.node.frontmatter
            const slug = post.node.fields.slug
            const featuredImgFluid = post.node.frontmatter.featuredImage
              ? post.node.frontmatter.featuredImage.childImageSharp.fluid
              : null
            return (
              <StyledCard>
                <Image fluid={featuredImgFluid} />
                <div className="card-content">
                  <header>
                    <small>
                      <Link to="/blog">BLOG</Link>
                    </small>
                    <h2>
                      <Link to={`/blog${slug}`}>{title}</Link>
                    </h2>
                    <small>Liffre-Piela, {date}</small>
                  </header>
                  <ul>
                    {categories &&
                      categories.map(cat => (
                        <Link to={`/blog/category/${_.kebabCase(cat)}`}>
                          <li>{cat}</li>
                        </Link>
                      ))}
                  </ul>
                  <p>
                    {description && description.length > 200
                      ? description.substring(0, 160) + "..."
                      : description}
                  </p>
                  <Link to={`/blog${slug}`} className="full-article-button">
                    <span>{`>>`} Lire l'article complet</span>
                  </Link>
                </div>
              </StyledCard>
            )
          })}
      </StyledGrid>
    </StyledSection>
  )
}
export default LatestBlogs
