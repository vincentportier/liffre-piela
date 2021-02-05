import React from "react"
import SEO from "../components/SEO"
import LatestBlogs from "../components/latestBlogs"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Home = ({ location, data }) => {
  return (
    <Layout location={location} banner={true}>
      <SEO />
      <LatestBlogs
        placeholder={data.placeholder}
        lastSixPosts={data.lastSixPosts}
      />
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    placeholder: file(name: { eq: "placeholder" }) {
      childImageSharp {
        fluid(maxWidth: 500) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
    lastSixPosts: allMarkdownRemark(
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
                fluid(maxWidth: 500) {
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
`
