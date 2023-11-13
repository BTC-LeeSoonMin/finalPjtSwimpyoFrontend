import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

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
            <Link to="/user/hotel_resort" style={linkStyle}>
              호텔/리조트
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/user/pension_poolvilla" style={linkStyle}>
              펜션/풀빌라
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/user/motel" style={linkStyle}>
              모텔
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/user/camping_glamping" style={linkStyle}>
              캠핑/글램핑
            </Link>
            <span style={separatorStyle}>|</span>
            <Link to="/user/guesthouse" style={linkStyle}>
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
            <Link to="/user/myPage" style={linkStyle}>
              마이페이지
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}