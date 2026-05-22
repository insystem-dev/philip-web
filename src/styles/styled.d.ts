import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    shadow: { dark: string; admin: string; adminHeader: string };
    gradient: { primary: string; dark: string };
    colors: {
      [primary: string]: string;
      [primaryHover: string]: string;
      [secondary: string]: string;
      [secondaryHover: string]: string;
      [func: string]: string;
      [funcHover: string]: string;
      dark: string;
      darkHover: string;
      search: string;
      searchHover: string;

      mainBg: string;
      kakaoBg: string;
      kakaoBgHover: string;
      vipBg: string;
      vipBgHover: string;

      disabledBtn: string;

      inputDarkBg: string;
      inputDarkBorder: string;

      subTxt: string;
      kakaoTxt: string;
      categorySubTxt: string;

      adminBg: string;
      adminMainTxt: string;
      adminLabelTxt: string;
      adminPlaceholder: string;
      adminBorder: string;
      adminDivider: string;
      adminInputBorder: string;
      adminInputBg: string;

      black: string;
      white: string;
      whiteHover: string;
    };
  }
}
