import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import { Link } from "gatsby"
import SEO from "../components/SEO"

const StyledContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const StyledHomeButton = styled(Link)`
  ${({ theme }) => theme.mixins.button}
  &:hover {
    color: var(--white);
  }
  margin-top: 50px;
`

const ThankYouPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Merci d'avoir contacté Liffré-Piéla" />
      <StyledContent>
        <div className="no-banner">
          <h1>
            Merci d'avoir contact Liffré Piéla, nous reviendrons vers vous dès
            que possible.
          </h1>
        </div>
        <StyledHomeButton to="/">Retourner à l'accueil </StyledHomeButton>
      </StyledContent>
    </Layout>
  )
}

export default ThankYouPage
