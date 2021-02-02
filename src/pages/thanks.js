import React, { useEffect, useState } from "react"
import Layout from "../components/layout"
import styled from "styled-components"
import SEO from "../components/SEO"
import { Link } from "gatsby"

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

export default function ThankYouPage() {
  return (
    <Layout>
      <StyledContent>
        <h1>
          Merci d'avoir contact Liffré Piéla, nous reviendrons vers vous dès que
          possible.
        </h1>
        <StyledHomeButton to="/">Retourner à l'accueil </StyledHomeButton>
      </StyledContent>
    </Layout>
  )
}
