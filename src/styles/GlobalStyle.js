import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

//font-size
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
/* font-family: 'Roboto', sans-serif; */

//CSS reset
html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    margin:0;
    padding:0;
  }

// declare color variables
:root {
    ${({ theme }) => theme.palette}
    ${({ theme }) => theme.fontSizes}
    --nav-height:100px;
	--nav-height-scroll:70px;
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --border-radius:3px;
}

#root {
    min-height: 100vh;
    height:200vh;
    width:100%;
  }

body {
    font-family: "Roboto", sans-serif;
}

a {
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    cursor:pointer;
    &:hover,
    &:focus {
      color: var(--primary);

	}
}

`
export default GlobalStyle
