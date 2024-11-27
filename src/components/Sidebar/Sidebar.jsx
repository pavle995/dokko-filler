import React from 'react';
import styled from 'styled-components';
import NavigationItem from './NavigationItem/NavigationItem';

const SidebarContainer = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f5f5f5;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding-top: 16px;
  padding-bottom: 16px;

`;

const StyledList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

function Sidebar() {
  const navigationItems = [
    {
      label: 'Dokumenti',
      icon: 'DescriptionIcon',
      route: '/',
    },
  ];

  return (
    <SidebarContainer>
      <StyledList>
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            label={item.label}
            icon={item.icon}
            route={item.route}
          />
        ))}
      </StyledList>
    </SidebarContainer>
  );
}

export default Sidebar;
