import * as React from 'react';
import {Grid, Container} from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';

const calendarStyles = {
  bgcolor: 'background.paper',
  height: '40rem',
  margin: '1rem',
};

const chartStyles = {
  bgcolor: 'background.paper',
  height: '24rem',
  margin: '1rem',
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AdminMain() {

  return (
    <Container component="main" sx={{
      display: { xs: 'none', sm: 'block' },
      color: 'black',
      width: '100%',
      // backgroundColor: 'lightgray',
      boxShadow: 'none', 
    }}>
    <Grid container>
      
      <Grid item xs={10}>
        <Box sx={{ ...calendarStyles, borderRadius: '13px'}}>
        <Typography
            variant="h6"
            sx={{
              color: 'black',
              textAlign: 'center',
              padding: '1rem',
            }}
            //color 텍스트 색 검정
          >예약 현황</Typography>
          <Stack spacing={1}>
            <Item sx={{ boxShadow: 'none', backgroundColor: 'black'}}>
              <Grid container sx={{color: 'white', alignItems: 'center', pt: '1rem', pb: '1rem'}}>
                <Grid item xs={1}>예약자</Grid>
                <Grid item xs={2}>룸</Grid>
                <Grid item xs={1}>숙박/대실</Grid>
                <Grid item xs={1}>차량/도보</Grid>
                <Grid item xs={2}>연락처</Grid>
                <Grid item xs={2}>체크인/아웃</Grid>
                <Grid item xs={2}>이용일</Grid>
                <Grid item xs={1}>입실</Grid>
              </Grid>
            </Item>
            <Item sx={{ boxShadow: 'none' }}>
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={1}>순민94</Grid>
                <Grid item xs={2}>민방위 룸</Grid>
                <Grid item xs={1}>숙박</Grid>
                <Grid item xs={1}>차량</Grid>
                <Grid item xs={2}>010-4580-8075</Grid>
                <Grid item xs={2}>13시/12시</Grid>
                <Grid item xs={2}>2023-10-25~2023-10-27</Grid>
                <Grid item xs={1}><Checkbox {...label} color="default"/></Grid>
              </Grid>
            </Item>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Item sx={{ boxShadow: 'none' }}>
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={1}>진범95</Grid>
                <Grid item xs={2}>아미 룸</Grid>
                <Grid item xs={1}>대실</Grid>
                <Grid item xs={1}>도보</Grid>
                <Grid item xs={2}>010-4580-8075</Grid>
                <Grid item xs={2}>15시/19시</Grid>
                <Grid item xs={2}>2023-10-25~2023-10-25</Grid>
                <Grid item xs={1}><Checkbox {...label} color="default"/></Grid>
              </Grid>
            </Item>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Item sx={{ boxShadow: 'none' }}>
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={1}>진범95</Grid>
                <Grid item xs={2}>아미 룸</Grid>
                <Grid item xs={1}>대실</Grid>
                <Grid item xs={1}>도보</Grid>
                <Grid item xs={2}>010-4580-8075</Grid>
                <Grid item xs={2}>15시/19시</Grid>
                <Grid item xs={2}>2023-10-25~2023-10-25</Grid>
                <Grid item xs={1}><Checkbox {...label} color="default"/></Grid>
              </Grid>
            </Item>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Item sx={{ boxShadow: 'none' }}>
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={1}>진범95</Grid>
                <Grid item xs={2}>아미 룸</Grid>
                <Grid item xs={1}>대실</Grid>
                <Grid item xs={1}>도보</Grid>
                <Grid item xs={2}>010-4580-8075</Grid>
                <Grid item xs={2}>15시/19시</Grid>
                <Grid item xs={2}>2023-10-25~2023-10-25</Grid>
                <Grid item xs={1}><Checkbox {...label} color="default"/></Grid>
              </Grid>
            </Item>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Item sx={{ boxShadow: 'none' }}>
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={1}>진범95</Grid>
                <Grid item xs={2}>아미 룸</Grid>
                <Grid item xs={1}>대실</Grid>
                <Grid item xs={1}>도보</Grid>
                <Grid item xs={2}>010-4580-8075</Grid>
                <Grid item xs={2}>15시/19시</Grid>
                <Grid item xs={2}>2023-10-25~2023-10-25</Grid>
                <Grid item xs={1}><Checkbox {...label} color="default"/></Grid>
              </Grid>
            </Item>
            <Divider orientation="horizontal" variant="fullWidth" />
            <Item sx={{ boxShadow: 'none' }}>
              <Grid container sx={{alignItems: 'center'}}>
                <Grid item xs={1}>진범95</Grid>
                <Grid item xs={2}>아미 룸</Grid>
                <Grid item xs={1}>대실</Grid>
                <Grid item xs={1}>도보</Grid>
                <Grid item xs={2}>010-4580-8075</Grid>
                <Grid item xs={2}>15시/19시</Grid>
                <Grid item xs={2}>2023-10-25~2023-10-25</Grid>
                <Grid item xs={1}><Checkbox {...label} color="default"/></Grid>
              </Grid>
            </Item>
            <Divider orientation="horizontal" variant="fullWidth" />
          </Stack>
          <Pagination count={10} size="small" sx={{display: 'flex', justifyContent: 'center', margin: '1rem'}}/>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box sx={{ ...chartStyles, borderRadius: '13px'}}>
          <List>
            <ListItem sx={{ textAlign: 'center'}}>
              <ListItemText primary="50" secondary="토탈" />
            </ListItem>
            <ListItem sx={{ textAlign: 'center'}}>
              <ListItemText primary="42" secondary="현재 예약 건수" />
            </ListItem>
            <ListItem sx={{ textAlign: 'center'}}>
              <ListItemText primary="36" secondary="입실 완료 룸" />
            </ListItem>
            <ListItem sx={{ textAlign: 'center'}}>
              <ListItemText primary="6" secondary="입실 예정" />
            </ListItem>
            <ListItem sx={{ textAlign: 'center'}}>
              <ListItemText primary="8" secondary="잔여 룸" />
            </ListItem>
          </List>
        </Box>
      </Grid>
    </Grid>
    </Container>
  );
}
