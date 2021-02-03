import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { css } from "styled-components"
import { Link } from "gatsby"
import { navLinks } from "../config"
import useScrollDirection from "../hooks/useScrollDirection"
import IconLogo from "../components/icons/logo"
import Menu from "../components/menu"

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexCenter};

  position: fixed;
  top: 0;
  z-index: 10;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;

  transition: var(--transition);
  ${props =>
    props.scrollDirection === "up" &&
    !props.scrolledToTop &&
    css`
      border: none;
      background: var(--white);
      height: var(--nav-height-scroll);
      transform: translateY(0px);
      box-shadow: rgba(0, 0, 0, 0.09) 0px 6px 9px 0px;
    `};

  ${props =>
    props.scrollDirection === "down" &&
    !props.scrolledToTop &&
    css`
      border: none;
      height: var(--nav-height-scroll);
      transform: translateY(calc(var(--nav-height-scroll) * -1));
      box-shadow: none;
    `};
`

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  width: 100%;
  height: 100%;
  overflow: hidden;
  max-width: 1380px;
  .left-nav {
    display: flex;
    align-items: center;
    width: 100%;
    .logo {
      svg {
        height: 200px;
        max-height: ${props =>
          props.scrolledToTop
            ? css`calc(var(--nav-height) - 20px)`
            : css`calc(var(--nav-height-scroll) - 20px)`};
        margin-right: 50px;

        cursor: pointer;
        transition: var(--transition);
      }
    }
    li {
      margin: 0 20px;
    }
  }

  .button {
    ${({ theme }) => theme.mixins.button}
    background:var(--primary);
    color: var(--white);
    @media (max-width: 768px) {
      display: none;
    }
  }
`

const StyledLinks = styled.div`
  ul {
    ${({ theme }) => theme.mixins.flexBetween};
    margin: 0;
    list-style: none;
    font-size: var(--fz-lg);
    font-weight: 600;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const Nav = () => {
  const scrollDirection = useScrollDirection()
  const [scrolledToTop, setScrolledToTop] = useState(true)

  const handleScroll = e => {
    setScrolledToTop(window.pageYOffset < 50)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <StyledHeader
      scrollDirection={scrollDirection}
      scrolledToTop={scrolledToTop}
    >
      <StyledNav scrolledToTop={scrolledToTop}>
        <div className="left-nav">
          <div className="logo">
            <Link to="/">
              <IconLogo />
            </Link>
          </div>
          <StyledLinks>
            <ul>
              {navLinks &&
                navLinks.map(({ name, url }, index) => {
                  return (
                    <li key={index}>
                      <Link to={url}>{name}</Link>
                    </li>
                  )
                })}
            </ul>
          </StyledLinks>
        </div>
        <Link to="/blog">
          <button className="button">Blog</button>
        </Link>
      </StyledNav>
      <Menu />
    </StyledHeader>
  )
}

export default Nav
