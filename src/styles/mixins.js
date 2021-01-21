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
    cursor: pointer;
    padding: 5px 10px;
    outline: none;
    border: none;
    font-size: var(--fz-s);
    line-height: 1;
    text-decoration: none;
    transition: var(--transition);
    padding: 1rem 1.5rem;
    &:hover {
      box-shadow: 0 10px 30px -15px var(--black);
    }
    &:after {
      display: none !important;
    }
  `,
  boxShadow: css`
    box-shadow: 0 10px 30px -15px var(--black);
  `,
}

export default mixins
