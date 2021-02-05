import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledPostsGrid = styled.div`
  padding: 2rem;
  @media (max-width: 480px) {
    padding: 1rem;
  }
  ul {
    list-style: none;
  }

  header {
    h1 {
      font-size: var(--fz-xxl);
      margin: 0;
    }
    p {
      color: var(--text-secondary);
      font-style: italic;
      font-size: var(--fz-sm);
    }
  }

  footer {
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;

    a {
      color: #8c451d;
    }
  }
`

const PostsGrid = ({ posts }) => {
  return (
    <StyledPostsGrid>
      <ul>
        {posts &&
          posts.map(post => {
            const slug = post.node.fields.slug
            const { title, date, description } = post.node.frontmatter

            return (
              <li key={post.node.fields.slug}>
                <article>
                  <header>
                    <h1>
                      <Link to={`/blog${slug}`}>{title}</Link>
                    </h1>
                    <p>{date}</p>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: description || post.node.excerpt,
                      }}
                    ></p>
                  </section>
                  <footer>
                    <Link to={`/blog${slug}`}>
                      <span>{`>>`} Lire l'article complet</span>
                    </Link>
                  </footer>
                </article>
                <hr />
              </li>
            )
          })}
      </ul>
    </StyledPostsGrid>
  )
}

export default PostsGrid
