import React from "react"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <div>
      <Link to="/">Home Button Placeholder</Link>
      {children}
    </div>
  )
}

export default Layout
