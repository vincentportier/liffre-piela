import React from "react"
import Layout from "../components/layout"
import ContactForm from "../components/contact-form"

const ContactPage = ({ location }) => {
  return (
    <Layout location={location} banner={true} bannerText="CONTACT">
      <ContactForm />
    </Layout>
  )
}

export default ContactPage
