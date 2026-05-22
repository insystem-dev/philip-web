import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  shadow: {
    dark: "0 0 14px 2px rgba(0, 0, 0, 0.4)",
    admin: "0 4px 10px -4px rgba(0,0,0,.1)",
    adminHeader: "0 2px 6px -4px rgba(0,0,0,.1)",
  },
  gradient: {
    primary:
      "linear-gradient(108.17deg, #4453FF 52.05%, #0028B4 163.25%, #4462FF 200.35%)",
    dark: "linear-gradient(180deg, rgba(0, 0, 0, 0) 20%, rgba(0,0,0, 0.9) 100%)",
  },
  colors: {
    primary: "#4462FF",
    primaryHover: "#3451E7",
    secondary: "#344AB9",
    secondaryHover: "#263BAA",
    dark: "#171717",
    darkHover: "#0C0C0C",
    func: "#646464",
    funcHover: "#585858",
    search: "#2E2E2E",
    searchHover: "#171717",

    mainBg: "#212121",
    searchBarBg: "#545454",
    kakaoBg: "#F7E600",
    kakaoBgHover: "#EBDB00",
    vipBg: "#4637DE",
    vipBgHover: "#3728CB",

    disabledBtn: "#dddddd",

    inputDarkBg: "#424242",
    inputDarkBorder: "#4563FF",

    subTxt: "#C0C0C0",
    kakaoTxt: "#181600",
    categorySubTxt: "#BABABA",

    adminBg: "#FBFBFC",
    adminMainTxt: "#484848",
    adminLabelTxt: "#6A6A6A",
    adminPlaceholder: "#C7C7C7",
    adminBorder: "#F6F7FA",
    adminDivider: "#E4E4E4",
    adminInputBorder: "#DFDFDF",
    adminInputBg: "#F8F8F8",

    black: "#000000",
    white: "#ffffff",
    red: "#ff5f5f",
    whiteHover: "#F6F7FA",
  },
};
