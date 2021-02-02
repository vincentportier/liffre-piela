import React, { useEffect, useState, useRef } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { navLinks } from "../config"
import useOnClickOutside from "../hooks/useOnClickOutside"
import { KEY_CODES } from "../utils/index"
import { Helmet } from "react-helmet"

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`

const StyledHamburgerButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background-color: transparent;
    text-transform: none;
    transition-timing-function: linear;
    transition-duration: 0.15s;
    transition-property: opacity, filter;
    &:focus {
      outline-color: var(--primary);
    }
  }

  .ham-box {
    display: inline-block;
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: var(--border-radius);
    background-color: var(--black);
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${props => (props.menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${props => (props.menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(
      ${props =>
        props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`}
    );
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: var(--hamburger-width);
      height: 2px;
      border-radius: 4px;
      background-color: var(--black);
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }
    &:before {
      width: 100%;
      top: ${props => (props.menuOpen ? `0` : `-10px`)};
      opacity: ${props => (props.menuOpen ? 0 : 1)};
      transition: ${({ menuOpen }) =>
        menuOpen ? "var(--ham-before-active)" : "var(--ham-before)"};
    }
    &:after {
      width: 100%;
      bottom: ${props => (props.menuOpen ? `0` : `-10px`)};
      transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
      transition: ${({ menuOpen }) =>
        menuOpen ? "var(--ham-after-active)" : "var(--ham-after)"};
    }
  }
`

const StyledSidebar = styled.div`
  display: none;
  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    outline: 0;
    background-color: var(--white);
    box-shadow: -10px 0px 30px -15px var(--black);
    z-index: 9;
    transform: translateX(${props => (props.menuOpen ? 0 : 100)}vw);
    visibility: ${props => (props.menuOpen ? "visible" : "hidden")};
    transition: var(--transition);
  }
  nav {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    flex-direction: column;
    text-align: center;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      position: relative;
      font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg));

      @media (max-width: 600px) {
        margin: 0 auto 10px;
      }
    }
    a {
      width: 100%;
      padding: 3px 20px 20px;
    }
  }
  .blog-button {
    ${({ theme }) => theme.mixins.button}
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }
`

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const hamburgerRef = useRef()
  const navRef = useRef(null)
  const wrapperRef = useRef(null)

  let focusable
  let firstFocusableEl
  let lastFocusableEl

  const setFocusable = () => {
    focusable = [
      hamburgerRef.current,
      ...Array.from(navRef.current.querySelectorAll("a")),
    ]
    firstFocusableEl = focusable[0]
    lastFocusableEl = focusable[focusable.length - 1]
  }

  const handleForwardTab = e => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault()
      firstFocusableEl.focus()
    }
  }

  const handleBackwardTab = e => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault()
      lastFocusableEl.focus()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    window.addEventListener("resize", onResize)
    setFocusable()
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const onResize = e => {
    if (e.currentTarget.innerWidth > 768) {
      setMenuOpen(false)
    }
  }

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setMenuOpen(false)
        break
      }
      case KEY_CODES.TAB: {
        if (focusable && focusable.length === 1) {
          e.preventDefault()
          break
        }
        if (e.shiftKey) {
          handleBackwardTab(e)
        } else {
          handleForwardTab(e)
        }
        break
      }
      default:
        break
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useOnClickOutside(wrapperRef, () => setMenuOpen(false))

  return (
    <StyledMenu>
      <Helmet>
        <body className={menuOpen ? "blur" : ""} />
      </Helmet>
      <div ref={wrapperRef}>
        <StyledHamburgerButton
          onClick={toggleMenu}
          menuOpen={menuOpen}
          aria-label="toggle the sidebar"
          ref={hamburgerRef}
        >
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>
        <StyledSidebar
          menuOpen={menuOpen}
          aria-hidden={!menuOpen}
          tabIndex={menuOpen ? 1 : -1}
        >
          <nav ref={navRef}>
            <ul>
              {navLinks &&
                navLinks.map(({ name, url }, i) => (
                  <li key={i} onClick={() => setMenuOpen(false)}>
                    <Link to={url}>{name}</Link>
                  </li>
                ))}
            </ul>
            <div>
              <Link
                to="/blog"
                className="blog-button"
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>
            </div>
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  )
}

export default Menu
