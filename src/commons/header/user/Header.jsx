import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { setAccessToken } from '../../../commons/rtk/slice/SignInSlice';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../hooks/RefreshTokenAuto';
import logo from '../../../assets/logo.png';

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
  fontSize: '16px',
  fontWeight: 'normal',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'black',
  fontWeight: 'normal',
};

export default function Header() {

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

    api.post("/api/user/member/logout", config,)
      .then((response) => {
        if(response.data !== null) {
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
        sx={{ backgroundColor: 'lemonchiffon', boxShadow: 'none' }}
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
              <img style={{maxHeight: '80px'}} src={logo} alt="logo Image" />
            </Link>
          </Box>
          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
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