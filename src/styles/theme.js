import mixins from "./mixins"
import { css } from "styled-components"

const theme = {
  mixins,
  fontSizes: css`
    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;
  `,
  fontFamilies: css`
    --fontFamily-sans: Montserrat, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol",
      "Noto Color Emoji";
    --fontFamily-serif: "Merriweather", "Georgia", Cambria, "Times New Roman",
      Times, serif;
    --font-body: var(--fontFamily-serif);
    --font-heading: var(--fontFamily-sans);
  `,
  palette: css`
    --white: #ffffff;
    --black: #43414e;
    --text-primary: #43414e;
    --text-secondary: rgba(0, 0, 0, 0.54);
    --text-disabled: rgba(0, 0, 0, 0.38);
    --primary: #d56d31;
    --secondary: #dc004e;
    --error: #f44336;
    --warning: #ff9800;
    --info: #2196f3;
    --success: #4caf50;
  `,
}

export default theme
