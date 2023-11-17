import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Header from '../../../commons/header/user/Header';
import Nav from '../../../commons/nav/user/Nav';
import Button from '@mui/material/Button';
import Modify from '../../member/user/Modify';
import { useState } from 'react';
import MyPageMain from './MyPageMain';
import ResLog from './resLog/ResLog';
import MyReview from './MyReview';

const drawerWidth = 240;

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  fontSize: '25px',
  fontWeight: 'normal',
  padding: '1rem',
  fontFamily: 'GangwonEdu_OTFBoldA',
};

export default function ClippedDrawer() {

  const [mainPage, setMainPage] = useState(true);
  const [modifyPage, setModifyPage] = useState(false);
  const [resLogListPage, setResLogListPage] = useState(false);
  const [reviewListPage, setReviewListPage] = useState(false);

  const home = (e) => {
    e.preventDefault();
    
    setModifyPage(false);
    setMainPage(true);
    setResLogListPage(false);
    setReviewListPage(false);
  };

  const modify = (e) => {
    e.preventDefault();
    
    setModifyPage(true);
    setMainPage(false);
    setResLogListPage(false);
    setReviewListPage(false);
  };

  const resLogList = (e) => {
    e.preventDefault();
    
    setResLogListPage(true);
    setModifyPage(false);
    setMainPage(false);
    setReviewListPage(false);
  };

  const reviewList = (e) => {
    e.preventDefault();
    
    setReviewListPage(true);
    setResLogListPage(false);
    setModifyPage(false);
    setMainPage(false);
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
          <Button fullWidth style={linkStyle} onClick={(e) => home(e)}>홈</Button>
          <Button fullWidth style={linkStyle} onClick={(e) => modify(e)}>회원정보수정</Button>
          <Button fullWidth style={linkStyle} onClick={(e) => resLogList(e)} >예약리스트</Button>
          <Button fullWidth style={linkStyle} onClick={(e) => reviewList(e)} >리뷰리스트</Button>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {mainPage && (<MyPageMain />)}
        {modifyPage && (<Modify />)}
        {resLogListPage && (<ResLog />)}
        {reviewListPage && (<MyReview />)}
      </Box>
    </Box>
  );
}
