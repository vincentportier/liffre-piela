import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import Categories from "../components/categories"
import Layout from "../components/layout"
import PostsGrid from "../components/posts-grid"
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

const StyledPageNavigation = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}

  ul {
    display: flex;
    list-style-type: none;
    flex-wrap: wrap;
    li {
      margin: 5px;
    }
  }
  .active {
    font-weight: 900;
  }
`

const BlogPageTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const heroImgFluid = data.hero.childImageSharp.fluid
  const { countCategories, allCategories, numPages, currentPage } = pageContext
  const [location, setLocation] = useState(null)

  useEffect(() => {
    let location = window.location.href
    const lastChar = location.slice(-1)
    lastChar === "g" ? setLocation(1) : setLocation(parseInt(lastChar))
  }, [])

  return (
    <Layout>
      <SEO title="All posts" />
      <StyledHero>
        <Img fluid={heroImgFluid} alt="hero" />
        <h1>BLOG</h1>
      </StyledHero>
      <PostsGrid posts={posts} />
      {numPages === 1 ? null : (
        <StyledPageNavigation>
          <ul>
            <li>
              <Link
                to={
                  currentPage === 1
                    ? "/blog"
                    : currentPage === 2
                    ? "/blog"
                    : `/blog/page/${currentPage - 1}`
                }
              >
                🡐
              </Link>
            </li>
            {Array.from({ length: numPages }).map((item, i) => {
              const index = i + 1
              const link = index === 1 ? "/blog" : `/blog/page/${index}`
              return (
                <li className={location === index ? "active" : null}>
                  {currentPage === index ? (
                    <span>{index}</span>
                  ) : (
                    <Link to={link}>{index}</Link>
                  )}
                </li>
              )
            })}
            <li>
              <Link
                to={
                  currentPage === numPages
                    ? `/blog/page/${currentPage}`
                    : `/blog/page/${currentPage + 1}`
                }
              >
                🡒
              </Link>
            </li>
          </ul>
        </StyledPageNavigation>
      )}
      <Categories
        countCategories={countCategories}
        allCategories={allCategories}
      />
    </Layout>
  )
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    hero: file(name: { eq: "hero" }) {
      childImageSharp {
        fluid(maxHeight: 500) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      limit: $limit
      sort: { fields: frontmatter___date, order: DESC }
      skip: $skip
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
