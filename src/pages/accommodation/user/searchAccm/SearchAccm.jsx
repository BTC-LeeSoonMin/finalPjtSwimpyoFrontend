import React, { useRef, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SearchAccmList from './SearchAccmList';
import Filter from './Filter';
import DateFilter from './DateFilter';
import { useEffect } from 'react';
import api from '../../../../hooks/RefreshTokenAuto';
import dayjs from 'dayjs';

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

function SearchAccm() {
  const [startDay, setStartDay] = useState(today);
  const [endDay, setEndDay] = useState(tomorrow);
  const [data, setData] = useState([startDay, endDay]);

  const onDataChange = (newData) => {
    setData(newData);
    console.log('data', data);
  };

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };
  const location = useLocation();
  const SearchInfo = [...location.state];
  const SearchList = useRef(SearchInfo);

  return (
    <Container component="main" maxWidth="lg" sx={{ marginBottom: '3rem', marginTop: '1rem' }}>
      <Grid container>

        <DateFilter 
        onDataChange={onDataChange} />

        <Grid item xs={10}>
          <Grid container>
            {/* {SearchList.current.map((item, index) => (
              <div key={index}>
                <p>Accommodation Kind: {item.a_acc_kind}</p>
                <p>Name: {item.a_acc_name}</p>
                <p>Address: {item.a_acc_address}</p>
                <p>Phone: {item.a_acc_phone}</p>
                <p>Introduction: {item.a_acc_intro}</p>
              </div>
            ))} */}
              {SearchList.current.map((item) => (<SearchAccmList {...item}  />))}
            {/* <SearchAccmList /> */}

          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Filter data={data} />
        </Grid>

      </Grid>
    </Container>
  );
}

export default SearchAccm;