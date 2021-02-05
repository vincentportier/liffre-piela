import React from "react"
import Layout from "../components/layout"
import ContactForm from "../components/contact-form"
import SEO from "../components/SEO"

const ContactPage = ({ location }) => {
  return (
    <Layout location={location} banner={true} bannerText="CONTACT">
      <SEO
        title="Contact - Liffré Piéla"
        description="Contactez Liffré-Piéla, l'association d'aide humanitaire et de coopération avec la région de Piéla au Burkina Faso"
      />
      <ContactForm />
    </Layout>
  )
}

export default ContactPage
