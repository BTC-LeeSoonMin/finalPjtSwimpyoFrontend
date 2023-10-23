import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 'normal',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'white',
  fontWeight: 'normal',
};

export default function AdminHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'black', boxShadow: 'none' }}
      >
        {' '}
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              width: '100%',
            }}
          >
            <a href="/admin" style={linkStyle}>
              쉼표 관리자
            </a>
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ 
              fontWeight: 'bold', 
              color: 'white', 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'flex-end', // 오른쪽 정렬
              alignItems: 'center' }}
          >
            <a href="/member/admin/signUp" style={linkStyle}>
              회원가입
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/member/admin/signIn" style={linkStyle}>
              로그인
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}