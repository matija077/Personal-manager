// import original module declarations
import 'styled-components';
import theme from "../styles/theme.styles"

type CustomTheme = typeof theme;

declare module "styled-components" {
    export interface DefaultTheme extends CustomTheme {}
  }