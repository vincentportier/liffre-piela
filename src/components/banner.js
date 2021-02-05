import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

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
    minHeight: "100vh",
    paddingBottom: "100px",
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
          <div className="title">
            <h1>LIFFRE-PIELA</h1>
          </div>
          <div className="subtitle">
            <h2>Association d'aide à la région de</h2>
            <h3>Piéla, Burkina Faso.</h3>
          </div>
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
  .content-innerPage {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white);
    padding-top: var(--nav-height);
    h1 {
      margin: 0;
      padding: 20px 50px;
      background: var(--primary);

      @media (max-width: 780px) {
        font-size: 25px;
      }
    }
  }
  .content-home {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: var(--white);
    padding-top: calc(var(--nav-height) + 150px);
    padding-left: 100px;

    @media (max-width: 780px) {
      padding-top: calc(var(--nav-height) + 75px);
      padding-left: 25px;
      padding-right: 25px;
      align-items: center;
    }

    .title {
      font-family: "Montserrat", sans-serif;

      h1 {
        background: var(--primary);
        font-size: 130px;
        margin: 0 0 2rem 0;
        padding: 10px 30px;

        @media (max-width: 1280px) {
          font-size: 100px;
        }
        @media (max-width: 1080px) {
          font-size: 80px;
        }
        @media (max-width: 780px) {
          font-size: 60px;
        }
        @media (max-width: 680px) {
          font-size: 40px;
        }
        @media (max-width: 380px) {
          font-size: 25px;
        }
      }
    }
    .subtitle {
      h2 {
        background: var(--text-primary);

        font-family: "Roboto", sans-serif;
        font-weight: 100;
        margin: 0;
        padding: 10px 30px;
        font-size: 50px;
        @media (max-width: 1280px) {
          font-size: 40px;
        }
        @media (max-width: 1080px) {
          font-size: 30px;
        }
        @media (max-width: 780px) {
          font-size: 30px;
        }
        @media (max-width: 680px) {
          font-size: 25px;
        }
      }
      h3 {
        background: var(--text-primary);

        font-family: "Montserrat", sans-serif;
        margin: 0;
        padding: 10px 30px;
        font-size: 100px;
        @media (max-width: 1280px) {
          font-size: 80px;
        }
        @media (max-width: 1080px) {
          font-size: 60px;
        }
        @media (max-width: 780px) {
          font-size: 50px;
        }
        @media (max-width: 680px) {
          font-size: 30px;
        }
      }
    }
  }
`
const StyledHeroBanner = styled(Banner)``

export default StyledHeroBanner
