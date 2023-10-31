import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { setAccessToken } from '../../../commons/rtk/slice/SignInSlice';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../../hooks/RefreshTokenAuto';

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

  const token = useSelector((store)=> store.accessToken.value);
  console.log('토큰 값', token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  const logout = (e) => {

    console.log("logout");

    api.post("/api/member/admin/logout", config,)
      .then((response) => {
        if(response.data !== null) {
          dispatch(setAccessToken.setAccessToken(''));
          console.log('로그아웃 후 토큰', token);
          navigate('/member/admin/signIn');

        } 
        
      })
      .catch();
  };

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
          {!token && <Typography
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
          </Typography>}
          {token && <Typography
            noWrap
            component="div"
            sx={{ 
              fontWeight: 'bold', 
              color: 'white', 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'flex-end', // 오른쪽 정렬
              alignItems: 'center' }}
              onClick={(e) => logout(e)}
          >
            로그아웃
          </Typography>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}