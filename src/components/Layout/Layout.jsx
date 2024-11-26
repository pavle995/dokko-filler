import React from 'react';
import styled from 'styled-components';
import Header from '~components/Header/Header';
import Footer from '~components/Footer/Footer';
import Sidebar from '~components/Sidebar/Sidebar';

const FlexContainer = styled.div`
  display: flex;
  // gap: 2%;
  flex-wrap: wrap;
  align-content: start;
  height: -webkit-fill-available;
  // margin: 0px 32px;
`;

const Content = styled.div`
  flex-grow: 1;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Layout({ children }) {
  return (
    <FlexContainer>
      <Header />
      <Sidebar />
      <Content>{children}</Content>
      <Footer />
    </FlexContainer>
  );
}

export default Layout;
