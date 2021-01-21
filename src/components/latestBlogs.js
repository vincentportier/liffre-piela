import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery, Link } from "gatsby"
import Image from "gatsby-image"
import _ from "lodash"

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

  return (
    <StyledGrid>
      {posts &&
        posts.map(post => {
          const { title, description, categories, date } = post.node.frontmatter
          const slug = post.node.fields.slug
          const featuredImgFluid = post.node.frontmatter.featuredImage
            ? post.node.frontmatter.featuredImage.childImageSharp.fluid
            : null
          return (
            <div style={{ width: "100px" }}>
              <Image fluid={featuredImgFluid} />
              <Link to={`/blog${slug}`}>
                <h1>{title}</h1>
              </Link>
              <ul>
                {categories &&
                  categories.map(cat => (
                    <Link to={`/blog/category/${_.kebabCase(cat)}`}>
                      <li>{cat}</li>
                    </Link>
                  ))}
              </ul>
              <small>{date}</small>
              <p>{description}</p>
            </div>
          )
        })}
    </StyledGrid>
  )
}
export default LatestBlogs
