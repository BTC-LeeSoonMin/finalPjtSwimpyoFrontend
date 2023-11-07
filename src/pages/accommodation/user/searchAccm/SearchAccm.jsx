import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SearchAccmList from './SearchAccmList';
import Filter from './Filter';
import DateFilter from './DateFilter';
import { useEffect } from 'react';
import api from '../../../../hooks/RefreshTokenAuto';



function SearchAccm() {

  const {data} = useParams();

  console.log('data', data);
  const [list, setList] = useState([]);

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {
    console.log('SearchList start');
    
    api.post("/api/user/accm/search", config,
    )
      .then(response => {
        console.log('백',response.data);
        setList(response.data);
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
               {list}
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