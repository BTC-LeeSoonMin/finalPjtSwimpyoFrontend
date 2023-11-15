import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import temp1 from '../../../assets/temp.jpg';
import temp2 from '../../../assets/temp2.jpg';
import { useNavigate } from 'react-router-dom';
import RegionAccm from './RegionAccm';

const Item = styled(MuiPaper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const slide = {
  display: 'flex',
  width: '100%',
  overflowX: 'auto',
  flexWrap: 'nowrap',
  mt: '8px',
};

function Main() {

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

  return (
    <Container component="main">
      <Box sx={{ marginBottom: '1rem', marginTop: '1rem', backgroundColor: 'white', padding: '1rem' }}>
        <Carousel>
          <Paper sx={{ height: '180px' }}><img src={temp1} alt="Temp Image" /></Paper>
          <Paper sx={{ height: '180px' }}><img src={temp2} /></Paper>
        </Carousel>
      </Box>
      <button onClick={test}>숙소가기테스트</button>
      <button onClick={testReview}>리뷰테스트</button>
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
              <Box sx={{ ...slide }}>
                <Card sx={{ maxWidth: 200, mt: '6px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100"
                      image={temp1}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom component="div">
                        호텔 이름
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        평점
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
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
              <Card sx={{ maxWidth: 200, mt: '6px' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="100"
                    image={temp1}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom component="div">
                      펜션 이름
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      평점
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Main;
