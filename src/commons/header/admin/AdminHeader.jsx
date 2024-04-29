/* eslint-disable */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { setAccessToken } from '../../../commons/rtk/slice/SignInSlice';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../hooks/RefreshTokenAuto';
import logo from '../../../assets/logo.png';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '20px',
  fontWeight: 'normal',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'white',
  fontWeight: 'normal',
};

export default function AdminHeader() {

  // const token = useSelector((store)=> store.persistor);
  const token = useSelector((store)=> store.accessToken.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  const logout = (e) => {

    api.post("http://43.203.71.198/api/admin/member/logout", config,)
      .then((response) => {
        if(response.data !== null) {
          dispatch(setAccessToken.setAccessToken(''));
          navigate('/admin/member/signIn');

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
            <Link to="/admin" style={linkStyle}>
              <img style={{maxHeight: '60px'}} src={logo} alt="logo Image" />
            </Link>
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
            <Link to="/admin/member/signUp" style={linkStyle}>
              회원가입
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/admin/member/signIn" style={linkStyle}>
              로그인
            </Link>
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
          >
            <Link onClick={(e) => logout(e)} style={linkStyle}>
              로그아웃 
            </Link>
          </Typography>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}