import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Header from '../../../commons/header/user/Header';
import Nav from '../../../commons/nav/user/Nav';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modify from '../../member/user/Modify';
import { useState } from 'react';
import MyPageMain from './MyPageMain';

const drawerWidth = 240;

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: 'normal',
  padding: '1rem',
};

export default function ClippedDrawer() {

  const [modifyPage, setModifyPage] = useState(false);
  const [mainPage, setMainPage] = useState(true);

  const modify = (e) => {
    e.preventDefault();
    
    if(mainPage) {
    setModifyPage(true);
    setMainPage(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Header />
        <Nav />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }, 
          backgroundColor: 'lemonchiffon'
        }}
      >
        <Toolbar sx={{height: "160px"}}/>
        <Box sx={{ overflow: 'auto' }}>
          <Button fullWidth style={linkStyle} onClick={(e) => modify(e)}>회원정보수정</Button>
          {/* <Link to="/user/member/modify"><Button fullWidth>회원정보수정</Button></Link> */}
          <Button fullWidth style={linkStyle}>찜</Button>
          <Button fullWidth style={linkStyle}>쿠폰</Button>
          <Button fullWidth style={linkStyle}>예약리스트</Button>
          <Button fullWidth style={linkStyle}>문의</Button>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {mainPage && (<MyPageMain />)}
        {modifyPage && (<Modify />)}
        {/* <BrowserRouter>
          <Routes>
            <Route
              path="/user/member/modify"
              element={<Modify />} />
          </Routes>
        </BrowserRouter> */}
      </Box>
    </Box>
  );
}
