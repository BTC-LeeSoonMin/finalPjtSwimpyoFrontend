import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: 'normal',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'white',
  fontWeight: 'normal',
};

export default function AdminNav() {

  const token = useSelector((store)=> store.accessToken.value);
  console.log('토큰 값', token); 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'black', boxShadow: 'none' }}
      >
        {' '}
        <Toolbar>
          {token && <Typography
            noWrap
            component="div"
            sx={{ 
              fontWeight: 'bold', 
              color: 'white', 
              display: 'flex', 
              alignItems: 'center',
              width: '100%' }}
          >
            <Link to="/admin/accommodation/registAccm" style={linkStyle}>
              숙박 시설 등록
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/" style={linkStyle}>
              리뷰관리
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/admin/member/modify" style={linkStyle}>
              계정 수정
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/" style={linkStyle}>
              나의 업소 관리
            </Link>
          </Typography>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}