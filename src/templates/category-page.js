import React, { useEffect, useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import Categories from "../components/categories"
import _ from "lodash"

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

const CategoryPageTemplate = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  const {
    numPages,
    currentPage,
    category,
    count,
    allCategories,
    countCategories,
  } = pageContext

  const [location, setLocation] = useState(null)

  useEffect(() => {
    let location = window.location.href
    const lastChar = location.slice(-1)
    lastChar === category.slice(-1)
      ? setLocation(1)
      : setLocation(parseInt(lastChar))
  }, [])

  return (
    <Layout>
      <h1>
        {category} ({count})
      </h1>
      <h2>Articles</h2>
      <ul>
        {posts &&
          posts.map(post => {
            const title = post.node.frontmatter.title || post.node.fields.slug
            return (
              <li key={post.node.fields.slug}>
                <article>
                  <header>
                    <h2>
                      <Link to={`/blog${post.node.fields.slug}`}>
                        <span>{title}</span>
                      </Link>
                    </h2>
                    <small>{post.node.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          post.node.frontmatter.description ||
                          post.node.excerpt,
                      }}
                    ></p>
                  </section>
                </article>
              </li>
            )
          })}
      </ul>
      {numPages <= 1 ? null : (
        <StyledPageNavigation>
          <ul>
            <li>
              <Link
                to={
                  currentPage === 1
                    ? `/blog/category/${category}`
                    : currentPage === 2
                    ? `/blog/category/${category}`
                    : `/blog/category/${category}/page/${currentPage - 1}`
                }
              >
                🡐
              </Link>
            </li>
            {Array.from({ length: numPages }).map((item, i) => {
              const index = i + 1
              const link =
                index === 1
                  ? `/blog/category/${category}`
                  : `/blog/category/${category}/page/${index}`
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
                    ? `/blog/category/${category}/page/${currentPage}`
                    : `/blog/category/${category}/page/${currentPage + 1}`
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

export const pageQuery = graphql`
  query($category: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { categories: { in: [$category] } }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            categories
            date(formatString: "MMMM DD, YYYY")
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
export default CategoryPageTemplate
