import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import Categories from "../components/categories"
import PostsGrid from "../components/posts-grid"
import _ from "lodash"
import SEO from "../components/SEO"

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

const CategoryPageTemplate = ({ data, pageContext, location }) => {
  const posts = data.allMarkdownRemark.edges

  const {
    numPages,
    currentPage,
    category,
    count,
    allCategories,
    countCategories,
  } = pageContext

  return (
    <Layout location={location}>
      <SEO
        title={`Catégorie: ${category} - Liffré Piéla`}
        description={`Retrouvez tous les blogs de Liffré Piéla dans la catégorie ${category}`}
      />
      <div className="no-banner">
        <h1
          style={{
            fontSize: "var(--fz-xxl)",
          }}
        >
          {count} article{count <= 1 ? null : "s"} dans la categorie: {category}
        </h1>

        <PostsGrid posts={posts} />

        {numPages <= 1 ? null : (
          <StyledPageNavigation>
            <ul>
              <li>
                <Link
                  to={
                    currentPage === 1
                      ? `/blog/category/${_.kebabCase(category)}`
                      : currentPage === 2
                      ? `/blog/category/${_.kebabCase(category)}`
                      : `/blog/category/${_.kebabCase(category)}/page/${
                          currentPage - 1
                        }`
                  }
                >
                  🡐
                </Link>
              </li>
              {Array.from({ length: numPages }).map((item, i) => {
                const index = i + 1
                const link =
                  index === 1
                    ? `/blog/category/${_.kebabCase(category)}`
                    : `/blog/category/${_.kebabCase(category)}/page/${index}`
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
                      ? `/blog/category/${_.kebabCase(
                          category
                        )}/page/${currentPage}`
                      : `/blog/category/${_.kebabCase(category)}/page/${
                          currentPage + 1
                        }`
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
      </div>
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
