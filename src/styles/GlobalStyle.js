import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`

//font-size
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
/* font-family: 'Roboto', sans-serif; */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
/* font-family: 'Montserrat', sans-serif; */

//CSS reset
html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
    line-height:1.5rem;
    font-size:16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
    ${({ theme }) => theme.fontFamilies}
    --nav-height:100px;
	  --nav-height-scroll:70px;
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    --border-radius:3px;
    --hamburger-width: 30px;
    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
}

#root {
    min-height: 100vh;
    width:100%;
  }

body {
  color:var(--text-primary);
  font-family: "Roboto", sans-serif;

  &.blur {
      overflow: hidden;

      #content > * {
        filter: blur(5px) brightness(1);
        transition: var(--transition);
        pointer-events: none;
        user-select: none;
      }
    }
}

main {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    min-height: 100vh;
    padding: 0px 150px 150px 150px;

    @media (max-width: 1080px) {
      padding: 0px 100px 150px 100px;
    }
    @media (max-width: 768px) {
      padding: 0px 50px 150px 50px;
    }
    @media (max-width: 480px) {
      padding: 0px 25px 125px 25px;
    }

    .no-banner {
      padding-top:var(--nav-height);
    }
  }

hr {
  background: var(--text-primary);
  height: 1px;
  margin:0 auto;
  border: 0;
}

//headings

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-header);
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}
h1 {
  font-weight:900
}
h2,
h3,
h4,
h5,
h6 {
font-weight:bold;
}


h1 {
  font-size:2.488rem;
}
h2 {
  font-size:2.074rem;
}
h3 {
  font-size:1.728rem;
}
h4 {
  font-size:1.44rem;
}
h5 {
  font-size:1.2rem;
}
h6 {
  font-size:1rem;
}

a {
    display: inline-block;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    cursor:pointer;
    text-decoration:none;
    
}

//Prose

p {
  line-height: 1.6;
  margin: 0 0 2rem 0;
  padding: 0;
}

ul,
ol {
  margin: 0 0 2rem 0;
  padding: 0;
  list-style-position: outside;
  list-style-image: none;
}

ul li,
ol li {
  padding-left: 0;
  margin-bottom: 1rem;
}

li > p {
  margin-bottom: 1rem;
}

li *:last-child {
  margin-bottom: 0;
}

li > ul {
  margin-left: 2rem;
}
li > ol {
  margin-left: 2rem;
}

blockquote {
  color: var(--text-secondary);
  margin-left: calc(-1 * 1.5rem);
  margin-right: 2rem;
  padding: 0 0 0 1.5rem;
  border-left: 0.25rem solid var(--primary);
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 2rem;
}

blockquote > :last-child {
  margin-bottom: 0px;
}


blockquote > ul,
blockquote > ol {
  list-style-position: inside;
}

table {
  width: 100%;
  margin-bottom: 2rem;
  border-collapse: collapse;
  border-spacing: 0.25rem;
}

table thead tr th {
  border-bottom: 1px solid var(--primary)
}


`
export default GlobalStyle
