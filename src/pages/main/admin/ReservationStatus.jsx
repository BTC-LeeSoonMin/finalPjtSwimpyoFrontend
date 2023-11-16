import * as React from 'react';
import { Grid, Container } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ReservationStatusList from './ReservationStatusList';
import { useEffect } from 'react';
import api from '../../../hooks/RefreshTokenAuto';
import { useState } from 'react';
import ResStatusDateFilter from './ResStatusDateFilter';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const left = {
  display: 'flex',
  justifyContent: 'flex-first',
  width: '100%',
  margin: '1rem'
}

const right = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  margin: '1rem'
}

const today = dayjs();

export default function ReservationStatus({a_m_no}) {
  const [date, setDate] = useState(dayjs(today).format("YYYY-MM-DD"));
    const [resList, setResList] = useState([]);

    const config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
    };

    useEffect(() => {
    
        api.get("/api/admin/accm/rezList", { params: { "a_m_no": parseInt(a_m_no), "date": date } }, )
          .then((response) => {
            if(response.data != null) {
                console.log('resList', response.data);
                setResList(response.data);
            } 
        });
    
      }, []);

  return (
    <Container component="main" sx={{
      display: { xs: 'none', sm: 'block' },
      color: 'black',
      width: '100%',
      boxShadow: 'none',
      mt: '3rem'
    }}>
      <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', margin: 'auto' }}>
        <ResStatusDateFilter setDate={setDate}/>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Typography variant="h6" sx={{ ...left, fontWeight: "bold" }}>예약 현황</Typography>
          <Typography sx={{ ...right }}>현재 예약 건수: {resList.length}</Typography>
        </Box>
        <Stack spacing={1}>
          <Item sx={{ boxShadow: 'none', backgroundColor: 'black' }}>
            <Grid container sx={{ color: 'white', alignItems: 'center', pt: '1rem', pb: '1rem' }}>
              <Grid item xs={1}>예약자</Grid>
              <Grid item xs={3}>룸</Grid>
              <Grid item xs={1}>숙박/대실</Grid>
              <Grid item xs={1}>차량여부</Grid>
              <Grid item xs={2}>연락처</Grid>
              <Grid item xs={1}>체크인/아웃</Grid>
              <Grid item xs={3}>이용일</Grid>
            </Grid>
          </Item>
          {(resList.length != 0) && resList.map((item) => (<ReservationStatusList  {...item}  />))}
          {(resList.length == 0) && <Item sx={{ boxShadow: 'none' }}>예약 정보가 없습니다.</Item>}
        </Stack>
      </Paper>
    </Container>
  );
}