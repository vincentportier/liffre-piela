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
  palette: css`
    --white: #ffffff;
    --black: #000000;
    --text-primary: rgba(0, 0, 0, 0.87);
    --text-secondary: rgba(0, 0, 0, 0.54);
    --text-disabled: rgba(0, 0, 0, 0.38);
    --primary: #1976d2;
    --secondary: #dc004e;
    --error: #f44336;
    --warning: #ff9800;
    --info: #2196f3;
    --success: #4caf50;
  `,
}

export default theme
