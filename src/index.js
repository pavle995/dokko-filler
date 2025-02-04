import React from "react";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "~components/ErrorBoundary/ErrorBoundary";
import Root from "~components/Root/Root";
import ThemeProvider from "~components/ThemeProvider/ThemeProvider";
import GlobalStyle from "../utils/GlobalSyile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <ErrorBoundary>
        <GlobalStyle />
        <Root />
      </ErrorBoundary>
    </ThemeProvider>
  </React.StrictMode>,
);
