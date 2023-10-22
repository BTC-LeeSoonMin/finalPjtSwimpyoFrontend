import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 'normal',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'black',
  fontWeight: 'normal',
};

const borderStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '5rem',
  };

export default function Nav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'lemonchiffon', boxShadow: 'none' }}
      >
        {' '}
        <Toolbar>
        <Typography
            noWrap
            component="div"
            sx={{ 
              fontWeight: 'bold', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%' }}
          ></Typography>
          <Typography
            noWrap
            component="div"
            sx={{ 
              fontWeight: 'bold', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center',
              width: '100%' }}
          >
            <a href="/user/member/signUp" style={linkStyle}>
              호텔/리조트
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/user/member/signIn" style={linkStyle}>
              펜션/풀빌라
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/user/member/signUp" style={linkStyle}>
              모텔
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/user/member/signIn" style={linkStyle}>
              캠핑/글램핑
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/user/member/signIn" style={linkStyle}>
              게스트하우스
            </a>
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ 
              fontWeight: 'bold', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'flex-end',
              width: '100%' }}
          >
            <a href="/user/member/signUp" style={linkStyle}>
              마이페이지
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}