import React, { useState } from 'react';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchAccmList from './SearchAccmList';
import Filter from './Filter';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
const dateStyle = {
    textAlign: 'center', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%'
}

function SearchAccm() {


  return (
    <Container component="main" maxWidth="lg" sx={{ marginBottom: '3rem', marginTop: '1rem' }}>
      <Grid container>
        <Box sx={{ ...dateStyle}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem component="DateRangePicker">
                    <DateRangePicker defaultValue={[today, tomorrow]} minDate={tomorrow} localeText={{ start: '체크인', end: '체크아웃' }} sx={{bgcolor: 'white', padding: '1rem', borderRadius: '10px' }}/>
                </DemoItem>
            </LocalizationProvider>
        </Box>

        <Grid item xs={10}>
            <SearchAccmList />
        </Grid>

        <Grid item xs={2}>
            <Filter />
        </Grid>

        </Grid>
    </Container>
  );
}

export default SearchAccm;