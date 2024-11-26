import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  height: 5%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.businessBlue.dark};
`;

function Footer() {
  return <FooterContainer>Footer</FooterContainer>;
}

export default Footer;
