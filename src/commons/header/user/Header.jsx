import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(7),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 'normal',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'black',
  fontWeight: 'normal',
};

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'lemonchiffon', boxShadow: 'none' }}
      >
        {' '}
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'black',
              width: '100%',
            }}
            //color 텍스트 색 검정
          >
            <a href="/" style={linkStyle}>
              쉼표
            </a>
          </Typography>
          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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
            <a href="/user/member/signUp" style={linkStyle}>
              회원가입
            </a>
            <span style={separatorStyle}>|</span>
            <a href="/user/member/signIn" style={linkStyle}>
              로그인
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}