import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from '../utils/GlobalSyile';
import ErrorBoundary from '~components/ErrorBoundary/ErrorBoundary';
import Root from '~components/Root/Root';
import ThemeProvider from '~components/ThemeProvider/ThemeProvider';
import { AuthProvider } from '~context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <GlobalStyle />
          <Root />
        </ErrorBoundary>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
