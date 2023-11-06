import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchAccmList from './SearchAccmList';
import Filter from './Filter';
import DateFilter from './DateFilter';
import { useEffect } from 'react';
import api from '../../../../hooks/RefreshTokenAuto';



function SearchAccm() {

  useEffect(() => {
    console.log('SearchList start');

    const config = {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    };  

    api.post("/api/user/accm/search", config,
    )
      .then(response => {
        // console.log(response.data);
        // setListData(response.data);
        // setAccImg(response.data.a_i_image);
        // setAccName(response.data.a_acc_name);
        // setAccKind(response.data.a_acc_kind);
        // setState(response.data.a_r_state);
        // setCheckIn(response.data.a_r_check_in);
        // setPrice(response.data.a_r_price);
      }
      )
      .catch(error => console.log(error))

  }, []);

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