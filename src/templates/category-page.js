import React from "react"
import { graphql } from "gatsby"

const categoryPageTemplate = ({ data }) => {
  console.log({ data })
  return <div>This is my category page</div>
}

export const pageQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            author
            categories
            date(formatString: "MMMM DD, YYYY")
            description
            tags
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
          excerpt
        }
      }
    }
  }
`
export default categoryPageTemplate
