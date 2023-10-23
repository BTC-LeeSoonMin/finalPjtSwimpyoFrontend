import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

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

export default function AdminNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'black', boxShadow: 'none' }}
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
              width: '100%' }}
          >
            <a href="/" style={linkStyle}>
              숙박 시설 등록
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/" style={linkStyle}>
              리뷰관리
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/" style={linkStyle}>
              계정 수정
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/" style={linkStyle}>
              나의 업소 관리
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
            <a href="/" style={linkStyle}>
              로그아웃
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}