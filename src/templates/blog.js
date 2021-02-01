import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import { Fragment } from "react"
import Categories from "../components/categories"
import Layout from "../components/layout"
import styled from "styled-components"
import Img from "gatsby-image"

const StyledHero = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  @media (max-width: 675px) {
    height: 120px;
  }
  h1 {
    margin: 0;
    color: var(--white);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const StyledCategories = styled.div`
  position: absolute;
  right: 50px;
  top: calc(var(--nav-height) + 250px + 2rem);
  width: 100px;
  ul {
    flex-direction: column;
    a {
      background-color: none;
    }
  }
`

const StyledPosts = styled.div`
  ul {
    list-style: none;
  }
`
const blogPageTemplate = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  const heroImgFluid = data.hero.childImageSharp.fluid

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
      <StyledHero>
        <Img fluid={heroImgFluid} alt="hero" />
        <h1>BLOG</h1>
      </StyledHero>
      <StyledCategories>
        <Categories />
      </StyledCategories>
      <StyledPosts>
        <h1>Les articles récent</h1>

        <ul>
          {posts &&
            posts.map(post => {
              const slug = post.node.fields.slug
              const { title, date, description } = post.node.frontmatter

              return (
                <li key={post.node.fields.slug}>
                  <article>
                    <header>
                      <h2>
                        <Link to={`/blog${slug}`}>{title}</Link>
                      </h2>

                      <p>{date}</p>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: description || post.node.excerpt,
                        }}
                      ></p>
                    </section>
                    <footer>
                      <Link to={`/blog${slug}`}>
                        <span>{`>>`} Lire l'article complet</span>
                      </Link>
                    </footer>
                  </article>
                  <hr />
                </li>
              )
            })}
        </ul>
      </StyledPosts>
    </Layout>
  )
}

export default blogPageTemplate

export const pageQuery = graphql`
  query {
    hero: file(name: { eq: "hero" }) {
      childImageSharp {
        fluid(maxHeight: 500) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
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
