import React, { useRef, useState } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin-bottom: 60px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--primary);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      margin-right: 10px;
      font-size: var(--fz-sm);
      counter-increment: section;
      content: "0" counter(section) ".";
    }

    &:after {
      display: none;
    }
  }
  .title {
    font-size: clamp(var(--fz-heading), 5vw, 100px);
  }

  p {
    font-size: var(--fz-md);
    color: var(--text-secondary);
  }

  .email-button {
    margin-top: 30px;
    ${({ theme }) => theme.mixins.button}
    ${({ theme }) => theme.mixins.boxShadow}
    @media (max-width:768px) {
      ${({ theme }) => theme.mixins.button}
      margin-top: 15px;
    }
  }
`

const StyledForm = styled.form`
  margin-top: 50px;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--fz-xxs);
    margin-bottom: 5px;
  }
  input,
  textarea {
    color: var(--text-secondary);
    width: 80%;
    font-family: var(--font-heading);
    &::placeholder {
      color: var(--text-secondary);
      font-family: monospace;
    }
  }
  input {
    padding: 5px 10px;
  }
  textarea {
    padding: 15px 10px;
  }
`

const ContactForm = () => {
  const revealContainer = useRef(null)
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...state }),
    })
      .then(() => {
        navigate("/thanks/")
        setState({ name: "", email: "", message: "" })
      })
      .catch(error => alert(error))

    e.preventDefault()
  }

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const { name, email, message } = state

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="overline">Contact</h2>
      <h2 className="title">Envoyez nous un message!</h2>
      <p>message text placeholder</p>
      <StyledForm
        onSubmit={e => handleSubmit(e)}
        name="contact"
        method="POST"
        data-netlify="true"
      >
        <p>
          <label>
            Nom:
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={e => handleChange(e)}
              placeholder="Name"
              required
            />
          </label>
        </p>
        <p>
          <label>
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e => handleChange(e)}
              placeholder="Email"
              required
            />
          </label>
        </p>
        <p>
          <label>
            Message:
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={e => handleChange(e)}
              rows={6}
              placeholder="Votre message ..."
              required
            />
          </label>
        </p>
        <button type="submit" className="email-button">
          Envoyer
        </button>
      </StyledForm>
    </StyledContactSection>
  )
}

export default ContactForm
