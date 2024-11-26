import React from 'react';
import styled from 'styled-components';
import { List, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { DescriptionIcon } from '~components/Icons';

const StyledDescriptionIcon = styled(DescriptionIcon)`
  width: 32px;
  height: 32px;
  fill: ${({ theme }) => theme.palette.grey[500]};
`;

const SidebarContainer = styled.div`
  width: fit-content;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f5f5f5;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  padding: 12px 0;
  margin: 1.6% 0 1.6% 1.6%;
`;

const StyledList = styled(List)`
  width: 100%;
`;

const StyledListItemLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 8px 16px;
  transition:
    background-color 1s ease,
    color 0.1s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.palette.grey[700]}; /* Boja pozadine na hover */
    color: ${({ theme }) => theme.palette.common.white};
    cursor: pointer;
    svg {
      fill: ${({ theme }) => theme.palette.common.white};
    }
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  min-width: 30px;
  display: flex;
  justify-content: center;
`;

const StyledListItemText = styled(ListItemText)`
  white-space: nowrap;
  font-size: 0.875rem;
`;

const StyledDivider = styled(Divider)`
  margin: 4px 0;
`;

function Sidebar() {
  const navigationItems = [
    {
      label: 'Documents List',
      icon: <StyledDescriptionIcon />,
      route: '/documents',
    },
  ];

  return (
    <SidebarContainer>
      <StyledList>
        {navigationItems?.map((item, index) => (
          <React.Fragment key={index}>
            <StyledListItemLink to={item.route}>
              <StyledListItemIcon>{item.icon}</StyledListItemIcon>
              <StyledListItemText primary={item.label} />
            </StyledListItemLink>
            {index < navigationItems.length - 1 && <StyledDivider />}
          </React.Fragment>
        ))}
      </StyledList>
    </SidebarContainer>
  );
}

export default Sidebar;
