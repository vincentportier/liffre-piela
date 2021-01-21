import React from "react"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import { Fragment } from "react"
import LatestBlogs from "../components/latestBlogs"
import Layout from "../components/layout"

const Home = ({ data }) => {
  return (
    <Layout>
      <SEO title="Liffre Piela" />
      <LatestBlogs />
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
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
