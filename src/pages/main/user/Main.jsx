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
import temp3 from '../../../assets/temp3.png';
import { useNavigate } from 'react-router-dom';

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

function Main() {

  const navigate = useNavigate();
  const testNo = 7;
  const test = () => {
    navigate(`/user/accommodation/detailAccm/${testNo}`);
  }

  const arNo = 1;

  const testReview = () => {
    navigate(`/user/review/regist/${testNo}/${arNo}`);
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
          <Grid item xs={5}>
            <Item>
              <Grid container>
                <Grid item xs={3}>
                  지역별 숙소
                </Grid>
                <Grid item xs={9} sx={{ mt: '10px' }}>
                  <Divider variant="middle" />
                </Grid>
              </Grid>
              <a href="/" style={linkStyle}>
                서울
              </a>
              <a href="/" style={linkStyle}>
                부산
              </a>
              <a href="/" style={linkStyle}>
                제주
              </a>
              <a href="/" style={linkStyle}>
                경기
              </a>
              <a href="/" style={linkStyle}>
                인천
              </a>
              <a href="/" style={linkStyle}>
                강원
              </a>
              <a href="/" style={linkStyle}>
                경상
              </a>
              <a href="/" style={linkStyle}>
                전라
              </a>
              <a href="/" style={linkStyle}>
                충청
              </a>
              <img src={temp3} style={{ width: '418px', height: 'auto', margin: '1rem' }} />
            </Item>
          </Grid>
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
