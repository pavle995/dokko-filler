import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const ErrorContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 42px;
  height: 100%;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  resetError() {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContentContainer>
          <ErrorWrapper>
            <h2>Something went wrong. Please try again later.</h2>
            <Button
              onClick={this.resetError}
              variant="contained"
              color="primary"
            >
              Reload
            </Button>
          </ErrorWrapper>
        </ErrorContentContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
