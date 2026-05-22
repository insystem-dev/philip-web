import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
${normalize}

html,
body {
  padding: 0;
  margin: 0;
  font-size: 10px;
  font-family: 'Noto Sans KR', 'Roboto', sans-serif;
  letter-spacing: -0.5px;
  background: #212121;
}

a {
  color: inherit;
  text-decoration: none;
}

p {
  padding: 0;
  margin: 0;
}

ul, li {
  padding: 0;
  margin: 0; 
  list-style: none;
}

* {
  box-sizing: border-box;
}

.spinner {
  position: relative;
}

.spinner:before {
  content: "";
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 0;
  border-radius: 50%;
  border: 2px solid #d1d3e0;
  border-right: 2px solid transparent;
}

.spinner:before {
  width: 1.5rem;
  height: 1.5rem;
  margin-top: -0.75rem;
}

.spinner:before {
  -webkit-animation: animation-spinner 0.5s linear infinite;
  animation: animation-spinner 0.5s linear infinite;
}

.spinner.spinner-white:before {
  border: 2px solid #ffffff;
  border-right: 2px solid transparent;
}

.spinner.spinner-right:before {
  left: auto;
  right: 1rem;
}
.err-message {
  color: red;
  font-size: 1.1rem;
}

.message {
  font-size: 1.1rem;
}

@-webkit-keyframes animation-spinner {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes animation-spinner {
  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`;
