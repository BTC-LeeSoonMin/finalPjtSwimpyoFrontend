/* eslint-disable */
import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import temp1 from '../../../assets/temp.jpg';
import temp2 from '../../../assets/temp2.jpg';
import { useNavigate } from 'react-router-dom';
import RegionAccm from './RegionAccm';
import BestHotel from './BestHotel';
import { useEffect } from 'react';
import api from '../../../hooks/RefreshTokenAuto';

const Item = styled(MuiPaper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Main() {
  const [bestHotel, setBestHotel] = useState([]);
  const [bestPension, setBestPension] = useState([]);

  const navigate = useNavigate();
  const testNo = 7;
  const test = () => {
    navigate(`/user/accommodation/detailAccm/${testNo}`);
  }

  const arNo = 9;
  const urNo = 25;

  const testReview = () => {
    navigate(`/user/review/regist/${testNo}/${arNo}`, { state: urNo });
  }


  const testReviewDetail = () => {
    navigate(`/user/review/detail`);
  }

  useEffect(() => {

    api.get("soonmin.info/api/user/accm/rankAccmList", { params: { "accmValue": '호텔/리조트' } },)
      .then((response) => {
        console.log('bestHotel', response.data);
        if (response.data != null) {
          setBestHotel(response.data);
        }
      });

    api.get("soonmin.info/api/user/accm/rankAccmList", { params: { "accmValue": '펜션/풀빌라' } },)
      .then((response) => {
        if (response.data != null) {
          setBestPension(response.data);
        }
      });
  }, [])

  return (
    <Container component="main">
      <Box sx={{ marginBottom: '1rem', marginTop: '1rem', backgroundColor: 'white', padding: '1rem' }}>
        <Carousel>
          <Paper sx={{ height: '180px' }}><img src={temp1} alt="Temp Image" /></Paper>
          <Paper sx={{ height: '180px' }}><img src={temp2} /></Paper>
        </Carousel>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <RegionAccm />
          <Grid item xs={7}>
            <Item>
              <Grid container>
                <Grid item xs={2}>
                  인기 호텔
                </Grid>
                <Grid item xs={10} sx={{ mt: '10px' }}>
                  <Divider variant="middle" />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%', }}>
                {bestHotel.slice(0, 3).map((item) => (<BestHotel {...item} />))}
              </Box>

            </Item>
            <Item sx={{ marginTop: '1rem' }}>
              <Grid container>
                <Grid item xs={2}>
                  인기 펜션
                </Grid>
                <Grid item xs={10} sx={{ mt: '10px' }}>
                  <Divider variant="middle" />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '100%', }}>
                {bestPension.slice(0, 3).map((item) => (<BestHotel {...item} />))}
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Main;
