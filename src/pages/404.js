import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledLink = styled(Link)`
  ${({ theme }) => theme.mixins.button}
`

const PageNotFound = () => {
  return (
    <Layout>
      <h1>Oups, voilà qui n'était pas prévu...</h1>
      <h2>La page que vous recherchez semble introuvable!</h2>
      <StyledLink to="/">Retour à la page d'accueil</StyledLink>
    </Layout>
  )
}

export default PageNotFound