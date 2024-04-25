/* eslint-disable */
import React from 'react';
import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import temp3 from '../../../assets/temp3.png';
import MuiPaper from '@mui/material/Paper';
import axios from 'axios';
import KakaoMapForMain from '../../../components/KakaoMapForMain';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../hooks/RefreshTokenAuto';

const Item = styled(MuiPaper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
  fontSize: '15px',
  fontWeight: 'normal',
  margin: '10px',
};

export default function RegionAccm() {
  const [region, setRegion] = useState('서울');

  // 백엔드에서 받은 도로명 주소
  const [accmAddress, setAccmAddress] = useState({});
  // 백엔드에서 받은 도로명 주소

  const [dataLoaded, setDataLoaded] = useState(false);

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  const regionAccm = (e, value) => {
    e.preventDefault();
    setRegion(value);

  };

  useEffect(() => {
    api.get("/api/user/accm/mapInfoList", { params: { "region": region } }, config,)
      .then((response) => {
        // console.log('MainMap', response.data);
        if (response.data === 'emptyMapInfo') {
          console.log('실패: emptyMapInfo');

        } else {

          console.log('성공');
          setAccmAddress(response.data);
          setDataLoaded(true);
        }
      });
  }, [region]);

  return (

    <Grid item xs={5} sx={{ mb: '3rem' }}>
      <Item>
        <Grid container>
          <Grid item xs={3}>
            지역별 숙소
          </Grid>
          <Grid item xs={9} sx={{ mt: '10px' }}>
            <Divider variant="middle" />
          </Grid>
        </Grid>
        <Link onClick={(e) => regionAccm(e, '서울')} style={linkStyle}>
          서울
        </Link>
        <Link onClick={(e) => regionAccm(e, '부산')} style={linkStyle}>
          부산
        </Link>
        <Link onClick={(e) => regionAccm(e, '제주')} style={linkStyle}>
          제주
        </Link>
        <Link onClick={(e) => regionAccm(e, '경기')} style={linkStyle}>
          경기
        </Link>
        <Link onClick={(e) => regionAccm(e, '인천')} style={linkStyle}>
          인천
        </Link>
        <Link onClick={(e) => regionAccm(e, '강원')} style={linkStyle}>
          강원
        </Link>
        <Link onClick={(e) => regionAccm(e, '경상')} style={linkStyle}>
          경상
        </Link>
        <Link onClick={(e) => regionAccm(e, '전라')} style={linkStyle}>
          전라
        </Link>
        <Link onClick={(e) => regionAccm(e, '충청')} style={linkStyle}>
          충청
        </Link>
        <Box sx={{ width: '100%' }}>
          {dataLoaded === true ? <KakaoMapForMain accmAddress={accmAddress} /> : <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{
              backgroundColor: 'background.default',
              color: 'text.primary',
            }}
          >
            <CircularProgress color="inherit" />
            <Typography variant="h3" component="h1">
              Loading...
            </Typography>
          </Box>}
        </Box>
      </Item>
    </Grid>

  );

}