import React from 'react';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/macro';
import styledNormalize from 'styled-normalize';
import OpenSansRegular from '../fonts/opensans-regular.woff';
import OpenSansSemiBold from '../fonts/opensans-semibold.woff';

import Header from './Header';
import Main from './Main';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  @font-face {
    font-family: 'Open Sans SemiBold';
    src: url(${OpenSansSemiBold});
    font-display: swap;
    font-style: normal;
    font-weight: 600;
  }
  
  @font-face {
    font-family: 'Open Sans Regular';
    src: url(${OpenSansRegular});
    font-display: swap;
    font-style: normal;
    font-weight: normal;
  }
  
  body {
    font-family: "Open Sans SemiBold", sans-serif;
    max-width: 960px;
    min-height: 100%;
    padding: 0;
    margin-left: auto;
    margin-right: auto;
    font-size: 12px;
    line-height: 18px;
    color: #4A4A4A;
    background-color: #E5E5E5;
  }

  * {
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul,
  ol,
  li {
    display: block;
    padding: 0;
    margin: 0;
  }
`;

const StyledApp = styled.div``;

const App = () => (
  <>
    <GlobalStyle />
    <StyledApp>
      <Header />
      <Main />
    </StyledApp>
  </>
);

export default App;
