import React from 'react';
import ThemeProvider from '~components/ThemeProvider/ThemeProvider';
import ErrorBoundary from '~components/ErrorBoundary/ErrorBoundary';
import GlobalStyle from '../utils/GlobalSyile';
import Root from '~components/Root/Root';
import Login from '~components/Authentication/Login';
import Signup from '~components/Authentication/Signup';


function App() {
  return (
    <Login />
  );
  // return (
  //   <ThemeProvider>
  //     <ErrorBoundary>
  //       <GlobalStyle />
  //       <Root />
  //     </ErrorBoundary>
  //   </ThemeProvider>
  // );
}

export default App;
