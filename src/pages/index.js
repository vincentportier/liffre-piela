import React from "react"

import SEO from "../components/SEO"
import LatestBlogs from "../components/latestBlogs"
import Layout from "../components/layout"

const Home = ({ data }) => {
  return (
    <Layout>
      <SEO title="Liffre Piela" />
      <LatestBlogs />
    </Layout>
  )
}

export default Home
