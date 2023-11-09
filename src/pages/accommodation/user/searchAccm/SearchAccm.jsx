import React, { useState } from 'react';
import { Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
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
  const [category, setCategory] = useState('호텔/리조트');
  const [area, setArea] = useState('서울');
  const [price, setPrice] = useState('０');
  const [stay, setStay] = useState('숙박');
  const [able, setAble] = useState('all');
  const [filter, setFilter] = useState([category, area, price, stay, able]);
  const [searchList, setSearchList] = useState([]);

  const location = useLocation();
  const searchWord = location.state;

  console.log('searchWord', searchWord);
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
      "searchValue": searchWord,
      "startDay": dayjs(startDay).format("YYYY-MM-DD"),
      "endDay": dayjs(endDay).format("YYYY-MM-DD"),
      "accmValue": filter[0],
      "region": filter[1],
      "priceOrder": filter[2],
      "dayUseOrStay": filter[3],
      "able": filter[4],
    }

    console.log('data', data);

    api.post("/api/user/accm/search", JSON.stringify(data), config,)
      .then((response) => {
        console.log('searchAccm', response.data);
        if(response.data != null) {
          setSearchList(response.data);
          console.log('searchList', searchList);
        }

      });

  }, [filter, endDay]);
 

  return (
    <Container component="main" maxWidth="lg" sx={{ marginBottom: '3rem', marginTop: '1rem' }}>
      <Grid container>

        <DateFilter
          onDataChange={onDataChange} />

        <Grid item xs={10}>
          <Grid container>
            {searchList.map((item) => (<SearchAccmList {...item}  />))}

          </Grid>
        </Grid>

        <Grid item xs={2}>
          <Filter
            setFilter={setFilter}
          />
        </Grid>

      </Grid>
    </Container>
  );
}

export default SearchAccm;