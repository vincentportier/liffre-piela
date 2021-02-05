import { css } from "styled-components"

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  button: css`
    border-radius: var(--border-radius);
    background-color: var(--primary);
    color: var(--white);
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 24px;
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);
    padding: 0.75rem 1.5rem;
    &:hover {
      opacity: 0.75;
    }
    &:after {
      display: none !important;
    }
    a {
      &:hover {
        color: inherit;
      }
    }
  `,
  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--black);
  `,
}

export default mixins
