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
  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.smallButton}
  }
`

export default function ThankYouPage() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <Layout>
      {isMounted && (
        <StyledContent className="fillHeight">
          <h1 className="small-heading">
            Thank you for your message, I'll get back to you as soon as
            possible!
          </h1>
          <StyledHomeButton to="/">Retourner à l'accueil </StyledHomeButton>
        </StyledContent>
      )}
    </Layout>
  )
}
