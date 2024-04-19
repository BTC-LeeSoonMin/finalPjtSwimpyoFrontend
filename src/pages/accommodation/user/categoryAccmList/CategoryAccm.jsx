/* eslint-disable */

import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SearchAccmList from '../searchAccm/SearchAccmList';
import DateFilter from '../searchAccm/DateFilter';
import { useEffect } from 'react';
import api from '../../../../hooks/RefreshTokenAuto';
import dayjs from 'dayjs';
import CategoryFilter from './CategoryFilter';

const list = {
  bgcolor: 'background.paper',
  height: '8rem',
  mt: '1rem',
  padding: '1rem',
  textAlign: 'center'
};

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

function CategoryAccm() {
  const [startDay, setStartDay] = useState(today);
  const [endDay, setEndDay] = useState(tomorrow);
  const [data, setData] = useState([startDay, endDay]);
//   const [category, setCategory] = useState('');
  const [area, setArea] = useState('서울');
  const [price, setPrice] = useState('０');
  const [stay, setStay] = useState('숙박');
  const [able, setAble] = useState('all');
  const [filter, setFilter] = useState([ area, price, stay, able]);
  const [searchList, setSearchList] = useState([]);

  const location = useLocation();
  const category = location.state;

  console.log('filter', filter);

  const onDataChange = (newData) => {
    setData(newData);
    setStartDay(newData[0]);
    setEndDay(newData[1]);

  };

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {

    let data = {};

    data = {
      "startDay": dayjs(startDay).format("YYYY-MM-DD"),
      "endDay": dayjs(endDay).format("YYYY-MM-DD"),
      "accmValue": category,
      "region": filter[0],
      "priceOrder": filter[1],
      "dayUseOrStay": filter[2],
      "able": filter[3],
    }

    console.log('data', data);

    api.post("/api/user/accm/search", JSON.stringify(data), config,)
      .then((response) => {
        console.log('searchAccm', response.data);
        if(response.data != null) {
          setSearchList(response.data);
        } 
      });

  }, [filter, endDay, category]);
 

  return (
    <Container component="main" maxWidth="lg" sx={{ marginBottom: '3rem', marginTop: '1rem',  height: '120vh'}}>
      <Grid container>

        <DateFilter
          onDataChange={onDataChange} />

        <Grid item xs={10}>
          <Grid container>
            {(searchList.length != 0) && searchList.map((item) => (<SearchAccmList {...item}  />))}
            {(searchList.length == 0) && 
            <Grid item xs={9} sx={{ml: '13rem'}}>
              <Box sx={{ ...list, borderRadius: '10px' }}>
                검색 결과가 없습니다.
              </Box>
            </Grid>}

          </Grid>
        </Grid>

        <Grid item xs={2}>
          <CategoryFilter
            setFilter={setFilter}
          />
        </Grid>

      </Grid>
    </Container>
  );
}

export default CategoryAccm;