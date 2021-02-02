import React from "react"
import Nav from "../components/nav"
import { ThemeProvider } from "styled-components"
import GlobalStyle from "../styles/GlobalStyle"
import theme from "../styles/theme"
import styled from "styled-components"
import Footer from "../components/footer"

const StyledContent = styled.main``

const Layout = ({ children }) => {
  return (
    <div id="root">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        <StyledContent>
          <div id="content">{children}</div>
        </StyledContent>

        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default Layout
