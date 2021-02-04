import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import Categories from "../components/categories"
import Layout from "../components/layout"
import PostsGrid from "../components/posts-grid"
import styled from "styled-components"

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

const BlogPageTemplate = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.edges
  const { countCategories, allCategories, numPages, currentPage } = pageContext

  return (
    <Layout location={location} banner={true} bannerText="BLOG">
      <SEO title="All posts" />
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
                <li className={currentPage === index ? "active" : null}>
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
