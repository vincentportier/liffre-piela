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
  margin-top:25px;
  .card-inner {
    display: grid;
    grid-template-columns: 30% 1fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      padding: 20px 30px;
      width: 100%;
    }

    h2 {
      font-size: 35px;
    }
    small {
      color: var(--text-secondary);
      transition: var(--transition);
      a {
        &:hover {
          color: inherit;
          text-decoration: underline;
        }
      }
    }
    ul {
      list-style: none;
      li {
        background: var(--primary);
        color: var(--white);
        border-radius: var(--border-radius);
        padding: 2px 5px;
        font-size: var(--fz-xxs);
        margin-right: 10px;
      }
    }
    .full-article-button {
      color: var(--text-secondary);
      margin: 10px 0 0 auto;
      font-size: var(--fz-reg);
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
                  fluid(maxWidth: 800) {
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
                <div className="card-inner">
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
                    <p>{description}</p>
                    <Link to={`/blog${slug}`} className="full-article-button">
                      {`>>`} Lire l'article complet
                    </Link>
                  </div>
                </div>
              </StyledCard>
            )
          })}
      </StyledGrid>
    </StyledSection>
  )
}
export default LatestBlogs
