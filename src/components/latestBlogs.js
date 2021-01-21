import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

const StyledGrid = styled.div``

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
              date(formatString: "MMM DD, YYYY")
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
  return <StyledGrid>{JSON.stringify(posts)}</StyledGrid>
}
export default LatestBlogs
