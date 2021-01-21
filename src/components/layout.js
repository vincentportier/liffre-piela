import React from "react"
import Nav from "../components/nav"
import { ThemeProvider } from "styled-components"
import GlobalStyle from "../styles/GlobalStyle"
import theme from "../styles/theme"

const Layout = ({ children }) => {
  return (
    <div id="root">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Nav />
        {children}
      </ThemeProvider>
    </div>
  )
}

export default Layout
