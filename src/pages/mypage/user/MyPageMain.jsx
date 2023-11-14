import * as React from 'react';
import {Grid, Container, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const button = {
    bgcolor: 'lemonchiffon',
    height: '7rem',
    textAlign: 'center',
    padding: '2rem', 
    mt: '1rem'
  };
const list = {
    bgcolor: 'background.paper',
    height: '20rem',
    textAlign: 'center',
    mt: '2rem',
    padding: '1rem', 
  };

const titleFont = {
    fontSize: '20px',
    fontWeight: 'bold',
};
  

export default function MyPageMain() {

  return (
    <Container component="main" sx={{
      display: { xs: 'none', sm: 'block' },
      color: 'black',
      width: '100%',
      boxShadow: 'none', 
      
    }}>
    {/* <Grid container>
      <Grid item xs={4}>
        <Box sx={{ ...button, mr: '5px', borderRadius: '50px'}}>
            <Typography sx={{...titleFont}}>
                찜
            </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ ...button, ml: '5px', mr: '5px', borderRadius: '50px'}}>
            <Typography sx={{...titleFont}}>
                쿠폰
            </Typography>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box sx={{ ...button, ml: '5px', borderRadius: '50px'}}>
            <Typography sx={{...titleFont}}>
                포인트
            </Typography>
        </Box>
      </Grid>
    </Grid> */}
    <Grid container>
      
      <Grid item xs={6}>
        <Box sx={{ ...list, borderRadius: '13px', mr: '10px'}}>
            <Typography sx={{...titleFont}}>
                예약
            </Typography>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ ...list, borderRadius: '13px', ml: '10px'}}>
            <Typography sx={{...titleFont}}>
                리뷰
            </Typography>
        </Box>
      </Grid>

    </Grid>
    </Container>
  );
}