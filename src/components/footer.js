import React, { useState, useEffect } from "react"

import styled from "styled-components"

const StyledFooter = styled.footer`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  height: auto;
  min-height: 70px;
  padding: 15px;
  text-align: center;
  color: var(--text-primary);
  font-size: var(--fz-xxs);
  line-height: 1;

  a {
    padding: 10px;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <a href="https://vportier.com" target="_blank" rel="noreferrer">
          <div>Conception Vincent Portier</div>
        </a>
      </div>
    </StyledFooter>
  )
}

export default Footer
