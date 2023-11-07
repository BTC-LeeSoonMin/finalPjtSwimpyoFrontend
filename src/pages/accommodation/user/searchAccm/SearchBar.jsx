import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../../../hooks/RefreshTokenAuto';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(7),
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

export default function SearchBar() {

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [category, setCategory] = useState('호텔/리조트'); 
  const [area, setArea] = useState('서울'); 
  const [price, setPrice] = useState('０'); 
  const [stay, setStay] = useState('숙박'); 
  const [able, setAble] = useState('all'); 

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  const navigate = useNavigate();

  const searchEnter = (e) => {
    if (e.key === 'Enter') {

      const searchWord = e.target.value;
      // console.log('checkIn', checkIn);
      // console.log('checkOut', checkOut);
      // console.log('검색어', searchWord);

      let data = {};
      data = {
        "searchValue" : searchWord, 
        "startDay" : checkIn, 
        "endDay" : checkOut,
        "accmValue" : category,
        "region" : area,
        "dayUseOrStay" : stay,
        "priceOrder" : price,
        "able" : able,

      };

      // console.log("data",data); 

      api.post("/api/user/accm/search", JSON.stringify(data), config,)
        .then((response) => {
          console.log('서치바' ,response.data);
          if (response.data !== null) {
            navigate('/user/searchAccm', {data: response.data});
          }

        });

    }
  };

  return (

    <Search sx={{ flexGrow: 1 }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="숙소명을 검색해보세요."
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={searchEnter}
      />
    </Search>

  );
}