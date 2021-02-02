import React from "react"
import { Link } from "gatsby"
import _ from "lodash"
import styled from "styled-components"

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  header {
    text-align: center;
    h1 {
      font-size: var(--fz-xxl);
    }
  }

  ul {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    flex-wrap: wrap;

    li {
      margin: 1rem;
      div {
        position: relative;
        color: var(--white);
        background-color: rgba(1, 1, 1, 0.75);
        border-radius: var(--border-radius);
        padding: 3px 15px;

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

const Categories = ({ countCategories, allCategories }) => {
  console.log(allCategories)
  return (
    <StyledSection>
      <header>
        <h1>Catégories</h1>
        <p>retrouvez tous nos articles par catégories</p>
      </header>
      <ul>
        {allCategories &&
          allCategories.map(cat => {
            let count = countCategories[cat]
            return (
              <li>
                <Link to={`/blog/category/${_.kebabCase(cat)}`}>
                  <div>
                    <span>{cat}</span>
                    <div className="badge">{count >= 100 ? "99+" : count}</div>
                  </div>
                </Link>
              </li>
            )
          })}
      </ul>
    </StyledSection>
  )
}

export default Categories
