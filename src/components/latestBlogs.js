import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"
import _ from "lodash"

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  .section-header {
    h1 {
      font-size: var(--fz-xxl);
      margin-bottom: 0;
    }
    h2 {
      margin-top: 1rem;
      color: var(--text-secondary);
      font-size: var(--fz-lg);
    }
  }
`

const StyledGrid = styled.div`
  display: grid;
  margin: 2rem 0;
  grid-template-columns: repeat(3, minmax(250px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  }
`

const StyledCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow}
  overflow: hidden;
  position: relative;

  .card-image-container {
    width: 100%;
    height: 168px;
    overflow: hidden;
  }

  .card-content {
    padding: 5px 10px;

    h1 {
      margin: 0;
      font-size: var(--fz-xxl);
      a {
        transition: var(--transition);
        &:hover {
          opacity: 0.85;
        }
      }
    }
    p {
      margin-bottom: 50px;
      font-size: var(--fz-md);
    }

    small {
      color: var(--text-secondary);
      transition: var(--transition);
      a {
        &:hover {
          text-decoration: underline;
          color: var(--text-secondary);
        }
      }
    }

    ul {
      display: flex;
      align-items: center;
      text-decoration: none;
      list-style-type: none;
      flex-wrap: wrap;
      margin-top: 3px;
      margin-bottom: 1rem;

      li {
        background: var(--primary);
        color: var(--white);
        border-radius: var(--border-radius);
        padding: 2px 6px;
        margin: 5px 5px 0 0;
        font-size: var(--fz-xxs);
        &:hover {
          opacity: 0.75;
        }

        a {
          &:hover {
            color: var(--white);
          }
        }
      }
    }
  }

  footer {
    position: absolute;
    bottom: 10px;
    left: 10px;

    a {
      color: var(--text-secondary);
      font-size: var(--fz-lg);
      &:hover {
        text-decoration: underline;
      }
    }
  }
`

const StyledBlogButton = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  margin-top:50px;
  a {
    ${({ theme }) => theme.mixins.button}
  }
`

const LatestBlogs = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholder: file(name: { eq: "placeholder" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 6
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

  const placeholderImageFluid = data.placeholder.childImageSharp.fluid
  const posts = data.allMarkdownRemark.edges

  return (
    <StyledSection>
      <header className="section-header">
        <h1>Nos derniers articles</h1>
        <h2>Retrouvez l'actualité de Liffré Piéla</h2>
      </header>
      <StyledGrid>
        {posts &&
          posts.map(post => {
            let { title, description, categories, date } = post.node.frontmatter
            const slug = post.node.fields.slug
            const featuredImgFluid = post.node.frontmatter.featuredImage
              ? post.node.frontmatter.featuredImage.childImageSharp.fluid
              : placeholderImageFluid

            return (
              <StyledCard key={slug}>
                <div className="card-image-container">
                  <Image fluid={featuredImgFluid} />
                </div>
                <div className="card-content">
                  <header>
                    <small>
                      <Link to="/blog">BLOG</Link>
                    </small>
                    <h1>
                      <Link to={`/blog${slug}`}>{title}</Link>
                    </h1>
                    <small>Liffré-Piela, {date}</small>
                    <ul>
                      {categories &&
                        categories.map(cat => (
                          <li>
                            <Link to={`/blog/category/${_.kebabCase(cat)}`}>
                              {cat}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </header>

                  <p>
                    {description && description.length > 200
                      ? description.substring(0, 160) + "..."
                      : description}
                  </p>
                </div>
                <footer>
                  <Link to={`/blog${slug}`}>
                    <span>{`>>`} Lire l'article complet</span>
                  </Link>
                </footer>
              </StyledCard>
            )
          })}
      </StyledGrid>
      <div>
        <StyledBlogButton>
          <Link to="/blog">Tous les articles</Link>
        </StyledBlogButton>
      </div>
    </StyledSection>
  )
}
export default LatestBlogs
