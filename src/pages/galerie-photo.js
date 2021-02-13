import React, { useState } from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import SEO from "../components/SEO"

const StyledImageGrid = styled.div`
  margin-top: 2rem;
  width: 100%;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(3, minmax(250px, 1fr));

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(250px, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(250px, 1fr));
  }
`
const StyledImageContainer = styled.div`
  object-fit: cover;
  width: 100%;
  max-height: 220px;
  overflow: hidden;
  @media (max-width: 768px) {
    max-height: 100%;
  }
`

const StyledDialog = styled(Dialog)`
  position: relative;
  margin: auto;
  margin-top: var(--nav-height);
  width: 70vw;
  padding: 0;
  z-index: 1000;

  @media (max-width: 780px) {
    width: 100vw;
  }

  div {
    button {
      font-style: "Montserrat", sans-serif;
      background: var(--primary);
      padding: 2px 5px;
      color: var(--white);
      outline: none;
      border: none;
      border-radius: var(--border-radius);
      :hover {
        cursor: pointer;
      }
    }
    .img {
      z-index: 1;
    }
    width: 100%;
    display: flex;
    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      z-index: 10000;
      background: var(--error);
    }
    .next {
      position: absolute;
      top: 50%;
      right: 5px;
      font-size: 25px;
    }
    .prev {
      position: absolute;
      top: 50%;
      left: 5px;
      z-index: 10000;
      font-size: 25px;
    }
  }
`

const PhotoGalleryPage = ({ data, location }) => {
  const photos = data.photos.edges
  const [showLightBox, setShowLightBox] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [index, setIndex] = useState(null)

  const previous = index => {
    const galleryLength = photos.length
    let newIndex
    if (index === 0) {
      newIndex = galleryLength - 1
      setIndex(newIndex)
      setSelectedImage(photos[newIndex].node.childImageSharp.fullsize)
      return
    }
    newIndex = index - 1
    setIndex(newIndex)
    setSelectedImage(photos[newIndex].node.childImageSharp.fullsize)
    return
  }

  const next = index => {
    const galleryLength = photos.length
    let newIndex
    if (index === galleryLength - 1) {
      newIndex = 0
      setIndex(newIndex)
      setSelectedImage(photos[newIndex].node.childImageSharp.fullsize)
      return
    }
    newIndex = index + 1
    setIndex(newIndex)
    setSelectedImage(photos[newIndex].node.childImageSharp.fullsize)
    return
  }
  return (
    <Layout banner={true} bannerText={"GALERIE"} location={location}>
      <SEO
        title="Gallerie photos - Liffré-Piéla"
        description="Retrouvez les dernières photos de Liffré-Piéla, association d'aide humanitaire et de coopération avec la région de Piéla au Burkina Faso"
      />
      <StyledImageGrid>
        {photos &&
          photos.map(({ node }, index) => (
            <StyledImageContainer
              key={node.name}
              type="button"
              onClick={() => {
                setShowLightBox(true)
                setSelectedImage(node.childImageSharp.fullsize)
                setIndex(index)
              }}
            >
              <Img fluid={node.childImageSharp.thumbnail} alt={node.name} />
            </StyledImageContainer>
          ))}
      </StyledImageGrid>
      <StyledDialog
        isOpen={showLightBox}
        aria-label="photo dialog"
        onDismiss={() => {
          setIndex(null)
          setSelectedImage(null)
          setShowLightBox(false)
        }}
      >
        <div>
          <button
            onClick={() => setShowLightBox(false)}
            aria-label="close dialog"
            className="close"
          >
            X
          </button>
          <button
            onClick={() => previous(index)}
            aria-label="precedent"
            className="prev"
          >
            {"<"}
          </button>
          {selectedImage && <Img fluid={selectedImage} />}
          <button
            onClick={() => next(index)}
            aria-label="suivant"
            className="next"
          >
            {">"}
          </button>
        </div>
      </StyledDialog>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    photos: allFile(
      filter: { relativeDirectory: { eq: "gallery" } }
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          name
          childImageSharp {
            thumbnail: fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_withWebp
            }
            fullsize: fluid(maxWidth: 1080) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
export default PhotoGalleryPage
