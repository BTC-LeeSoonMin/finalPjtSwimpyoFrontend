import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { setAccessToken } from '../../../commons/rtk/slice/SignInSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../hooks/RefreshTokenAuto';
import logo from '../../../assets/logo.png';
import SearchBar from '../../../pages/accommodation/user/searchAccm/SearchBar';


const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '23px',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'white',
  fontWeight: '300',
};

export default function Header() {

  const token = useSelector((store) => store.accessToken.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  const logout = (e) => {

    api.post("/api/user/member/logout", config,)
      .then((response) => {
        if (response.data !== null) {
          dispatch(setAccessToken.setAccessToken(''));
          navigate('/');

        }

      })
      .catch();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#F7323F', boxShadow: 'none' }}
      >
        {' '}
        <Toolbar>
          <Box
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'black',
              width: '100%',
            }}
          >
            <Link to="/" style={linkStyle}>
              <img style={{ maxHeight: '80px' }} src={logo} alt="logo Image" />
            </Link>
          </Box>
          <Box sx={{
            fontWeight: 'bold',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}>
            <SearchBar />
          </Box>
          {!token && <Typography
            noWrap
            component="div"
            sx={{
              fontFamily: 'GangwonEdu_OTFBoldA',
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end', // 오른쪽 정렬
              alignItems: 'center'
            }}
          >
            <Link to="/user/member/signUp" style={linkStyle}>
              회원가입
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/user/member/signIn" style={linkStyle}>
              로그인
            </Link>
          </Typography>}
          {token && <Typography
            noWrap
            component="div"
            sx={{
              fontFamily: 'GangwonEdu_OTFBoldA',
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end', // 오른쪽 정렬
              alignItems: 'center'
            }}
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