import React from "react"
import Nav from "../components/nav"
import { ThemeProvider } from "styled-components"
import GlobalStyle from "../styles/GlobalStyle"
import theme from "../styles/theme"
import styled from "styled-components"
import Footer from "../components/footer"
import StyledHeroBanner from "./banner"

const StyledContent = styled.main``

const Layout = ({ children, location, banner, bannerText }) => {
  return (
    <div id="root">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        {banner && (
          <StyledHeroBanner location={location} bannerText={bannerText} />
        )}
        <StyledContent>
          <div id="content">{children}</div>
        </StyledContent>
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default Layout
