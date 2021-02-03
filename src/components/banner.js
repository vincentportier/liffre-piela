import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

import BackgroundImage from "gatsby-background-image"

const Banner = ({ className, bannerText, location }) => {
  const data = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "hero-home.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1980) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )

  const imageData = data.desktop.childImageSharp.fluid

  const homeBannerStyle = {
    height: "100vh",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }

  const pageBannerStyle = {
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: 300,
  }

  const homeBannerMarkup = (
    <BackgroundImage
      Tag="section"
      className={className}
      fluid={imageData}
      backgroundColor={true}
      style={homeBannerStyle}
    >
      <StyledInnerWrapper>
        <div className="content-home">
          <h1>{bannerText}</h1>
          {/* <div className="image-wrapper">
            <Img fluid={imageData} />
          </div> */}
        </div>
      </StyledInnerWrapper>
    </BackgroundImage>
  )

  const pageBannerMarkup = (
    <BackgroundImage
      Tag="section"
      className={className}
      fluid={imageData}
      backgroundColor={true}
      style={pageBannerStyle}
    >
      <StyledInnerWrapper>
        <div className="content-innerPage">
          <h1>{bannerText}</h1>
        </div>
      </StyledInnerWrapper>
    </BackgroundImage>
  )

  return location.pathname === "/" ? homeBannerMarkup : pageBannerMarkup
}

const StyledInnerWrapper = styled.div`
  color: var(--white);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* .content-home {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }

  h1 {
    margin: 0;
    padding: 0;
  }
  .image-wrapper {
    width: 200px;
    height: auto;
  }
  .content-innerPage {
  } */
`
const StyledHeroBanner = styled(Banner)``

export default StyledHeroBanner
