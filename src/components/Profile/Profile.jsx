import { Menu, MenuItem, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOutUtil } from '../../utils/cognitoAuth';
import { MyAccountIcon, PowerOffLineIcon } from '~components/Icons';
import { useAuth } from '~context/AuthContext';
import { useNotification } from '~context/NotificationContext';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const StyledMyAccountIcon = styled(MyAccountIcon)`
  width: 32px;
  height: 32px;
  fill: ${({ theme }) => theme.palette.primary.light};
`;

const StyledSwitchIcon = styled(PowerOffLineIcon)`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.palette.error.light};
`;

const Profile = () => {
  const navigate = useNavigate();
  const showNotification = useNotification();
  const { user, logout, refreshUser } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    try {
      await signOutUtil();
      logout();
      await refreshUser();

      showNotification('Uspešno ste se odjavili.', 3000, 'success');
      navigate('/login');
    } catch (error) {
      showNotification('Greška pri odjavi. Pokušajte ponovo.', 5000, 'error');
    }
  };

  return (
    <ProfileContainer>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color='inherit'>
        <StyledMyAccountIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem disabled>Korisnik: {user || 'Korisnik'}</MenuItem>
        <hr />
        <MenuItem
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          onClick={handleLogout}
        >
          <span>Odjava</span>
          <StyledSwitchIcon />
        </MenuItem>
      </Menu>
    </ProfileContainer>
  );
};

export default Profile;
