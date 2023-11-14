import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  fontSize: '18px',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'black',
  fontWeight: 'normal',
};

export default function Nav() {

  const token = useSelector((store)=> store.accessToken.value);
  console.log('토큰 값', token);

  const notSignIn = (e) => {
    alert('로그인 후 사용 가능합니다.');

  };

  const navigate = useNavigate();

  const categoryAccm = (e, value) => {
    e.preventDefault();
    const category = value;
    console.log('category', category);
    navigate('/user/categoryAccm', { state: category });

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'lemonchiffon', boxShadow: 'none', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
              fontFamily: 'GangwonEdu_OTFBoldA',
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%' }}
          >
            <Link onClick={(e) => categoryAccm(e, '호텔/리조트')} style={linkStyle}>
              호텔/리조트
            </Link>
            <span style={separatorStyle}>|</span>
            <Link onClick={(e) => categoryAccm(e, '펜션/풀빌라')} style={linkStyle}>
              펜션/풀빌라
            </Link>
            <span style={separatorStyle}>|</span>
            <Link onClick={(e) => categoryAccm(e, '모텔')} style={linkStyle}>
              모텔
            </Link>
            <span style={separatorStyle}>|</span>
            <Link onClick={(e) => categoryAccm(e, '캠핑/글램핑')} style={linkStyle}>
              캠핑/글램핑
            </Link>
            <span style={separatorStyle}>|</span>
            <Link onClick={(e) => categoryAccm(e, '게스트하우스')} style={linkStyle}>
              게스트하우스
            </Link>
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ 
              fontFamily: 'GangwonEdu_OTFBoldA',
              display: 'flex', 
              justifyContent: 'flex-end',
              width: '100%' }}
          >
            {token && <Link to={"/user/myPage"} style={linkStyle}>
              마이페이지
            </Link>}
            {!token && <Link to="/user/member/signIn" onClick={(e) => notSignIn(e)} style={linkStyle}>
              마이페이지
            </Link>}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}