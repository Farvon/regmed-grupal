import React, { useState } from 'react';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BtnOut from './ButtonLogOut';
import { ILogo } from '../assets/icons/logo';
const settings = ['Logout'];


const HeaderComponent = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('loggedRegMedUser');
    window.location.href = '/';
  };

  return (
    <AppBar>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Anchor href="/">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ILogoContainer>
                <ILogo/>
              </ILogoContainer>
              <Span>REGMED</Span>
            </Box>
          </Anchor>

          <Box>
            {/* Avatar */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  alt="Menu">
                  <LogoutIcon color="primary" />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <span onClick={() => handleLogout()}>{setting}</span>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderComponent;

const AppBar = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
`;

const Container = styled.div`
  border-bottom: solid 5px black;
  width: 2560px;
  background-color: #3dadc5;
  padding 10px 40px;
  border-bottom: 5px solid black;

  
`;

const Anchor = styled.a`
  text-decoration: none;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  height:4.7em;
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ILogoContainer = styled.div`
  display: flex;
  width: 3.5em;
  margin-right: 10px;
  opacity: 0.7;
`;

const Span = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight:bold;
  color: white;
  font-size: 3em;
`;

