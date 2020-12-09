import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

import { createMuiTheme, ThemeProvider, Typography } from '@material-ui/core';

import { useStore } from '../store';

import Footer from '../components/elements/Footer';
import Navbar from '../components/elements/Navbar';
import { WEBSITE_NAME } from '../constants/constants';


const theme = createMuiTheme({
  props: {
    MuiSvgIcon: {
      htmlColor: '#FFFFFF',
    },
  },
  palette: {
    type: 'dark',
    divider: '#fff',
    primary: {
      main: '#cccccc',
    },
    secondary: {
      main: '#bbb',
    },
    text: {
      primary: '#ccc',
      secondary: '#aaa',
    },
    background: {
      paper: '#222',
    },
    action: {
      selected: '#fff',
    },
  },
  typography: {
    fontFamily: 'Raleway, san-serif',
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215',
  },
  overrides: {
    MuiInputBase: {
      root: {
        "& input": {
          "&:-webkit-autofill": {
            transition:
                  "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
          },
          "&:-webkit-autofill:focus": {
            transition:
                  "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
          },
          "&:-webkit-autofill:hover": {
            transition:
                  "background-color 50000s ease-in-out 0s, color 50000s ease-in-out 0s",
          },
        },
      },
    },
  },
});


const GlobalStyle = createGlobalStyle`
  html {
    background-color: #000000;
  }
  body {
    background-color: #000000;
    height: 100%;
    width: 100%;
  }
`;


const App = ({Component, pageProps}) => {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <title>{WEBSITE_NAME}</title>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover"/>
        <meta property="og:title" content="This is a highly opinionated React starter uses Nextjs for SSR, material design, styled components, rematch (redux), and more" key="title" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Typography color="primary" component="div">
          <Navbar />
          <Component {...pageProps}/>
          <Footer />
        </Typography>
      </ThemeProvider>
    </Provider>
  );
};

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

export default App;
