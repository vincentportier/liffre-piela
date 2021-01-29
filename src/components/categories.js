import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import _ from "lodash"
import styled from "styled-components"

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  header {
    text-align: center;
  }

  ul {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    flex-wrap: wrap;

    li {
      margin: 20px;
      div {
        position: relative;
        font-family: "Roboto", sans-serif;
        color: var(--white);
        background-color: var(--text-secondary);
        font-weight: 500;
        border-radius: var(--border-radius);
        padding: 5px 15px;
        span {
        }
        .badge {
          ${({ theme }) => theme.mixins.flexCenter}
          position: absolute;
          background: var(--primary);
          font-size: var(--fz-xxs);
          color: var(--white);
          border-radius: 50%;
          width: 30px;
          height: 30px;
          top: -18px;
          right: -18px;
        }
      }
    }
  }
`

const Categories = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              categories
            }
          }
        }
      }
    }
  `)

  // const [isHome, setIsHome] = useState(null)

  // useEffect(() => {
  //   let location = window.location.pathname

  //   if (location === "/") setIsHome(true)
  //   else setIsHome(false)
  // }, [])

  const posts = data.allMarkdownRemark.edges
  const categoriesFound = ["uncategorized"]
  const allCategories = []

  posts.forEach(post => {
    if (
      !post.node.frontmatter.categories ||
      post.node.frontmatter.categories.length === 0
    ) {
      allCategories.push("uncategorized")
    }

    post.node.frontmatter.categories &&
      post.node.frontmatter.categories.forEach(cat => {
        allCategories.unshift(cat)
        if (categoriesFound.indexOf(cat) === -1) {
          categoriesFound.unshift(cat)
        }
      })
  })

  categoriesFound.forEach((cat, idx) => {
    let count = allCategories.filter(categ => categ === cat).length
    categoriesFound[idx] = [cat, count]
  })

  return (
    <StyledSection>
      <header>
        <h1>Categories</h1>
      </header>
      <ul>
        {categoriesFound.length &&
          categoriesFound.map(([cat, count]) => (
            <li>
              <Link to={`/blog/category/${_.kebabCase(cat)}`}>
                <div>
                  <span>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  <div className="badge">{count >= 100 ? "99+" : count}</div>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </StyledSection>
  )
}

export default Categories
