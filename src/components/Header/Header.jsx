import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  width: 100%;
  height: 5%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.businessBlue.light};
`;

function Header() {
  return <HeaderContainer></HeaderContainer>;
}

export default Header;
