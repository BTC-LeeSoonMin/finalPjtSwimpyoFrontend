import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchAccmList from './SearchAccmList';
import Filter from './Filter';
import DateFilter from './DateFilter';



function SearchAccm() {


  return (
    <Container component="main" maxWidth="lg" sx={{ marginBottom: '3rem', marginTop: '1rem' }}>
      <Grid container>

        <DateFilter />

        <Grid item xs={10}>
            <Grid container>
                <SearchAccmList />
                <SearchAccmList />
                <SearchAccmList />
                <SearchAccmList />
                <SearchAccmList />
                <SearchAccmList />
                <SearchAccmList />
                <SearchAccmList />
                <SearchAccmList />
            </Grid>
        </Grid>

        <Grid item xs={2}>
            <Filter />
        </Grid>

        </Grid>
    </Container>
  );
}

export default SearchAccm;