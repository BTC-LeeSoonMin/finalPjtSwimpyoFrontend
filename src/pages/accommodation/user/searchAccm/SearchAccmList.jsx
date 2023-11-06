import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import accmImg from '../../../../assets/temp.jpg';
import Rating from '@mui/material/Rating';
import api from '../../../../hooks/RefreshTokenAuto';

const list = {
  bgcolor: 'background.paper',
  height: '8rem',
  mt: '1rem',
  padding: '1rem',
};

const font = {
  fontSize: '15px',
  fontWeight: 'normal',
};

const titleFont = {
  fontSize: '16px',
  fontWeight: 'bold',
};

const info = {
  textAlign: 'right',
  fontSize: '15px',
  fontWeight: 'normal',
}

function SearchAccmList() {
  const [star, setStar] = useState(4);
  const [accImg, setAccImg] = useState('');   // 숙박업소 이름
  const [accName, setAccName] = useState('');   // 숙박업소 이름
  const [accKind, setAccKind] = useState('');   // 종류
  const [state, setState] = useState('');       // 숙박/대실
  const [checkIn, setCheckIn] = useState('');   //체크인 시간
  const [price, setPrice] = useState('');       //가격

  const [listData, setListData] = useState([]);

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {
    console.log('SearchList start');

    api.get("/api/user/accm/search",
      config,
    )
      .then(response => {
        console.log(response.data);
        setListData(response.data);
        setAccImg(response.data.a_i_image);
        setAccName(response.data.a_acc_name);
        setAccKind(response.data.a_acc_kind);
        setState(response.data.a_r_state);
        setCheckIn(response.data.a_r_check_in);
        setPrice(response.data.a_r_price);
      }
      )
      .catch(error => console.log(error))

  }, []);

  return (
    <Grid item xs={6}>
      <Box sx={{ ...list, borderRadius: '10px', mr: '1rem' }}>
        <Grid container>
          <Grid item xs={6}>
            <img style={{ maxHeight: '125px', maxWidth: '200px' }} src={accmImg} alt="Accm Image" />
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ borderRadius: '13px', mr: '1rem' }}>
              <Typography sx={{ ...titleFont }}>
                숙박업소 이름
              </Typography>
              <Rating name="read-only" value={star} readOnly size="small" />
              <Typography sx={{ ...font }} >
                모텔
              </Typography>
              <Typography sx={{ ...info, mt: '10px' }} >
                대실 4시간 | 40,000원~
              </Typography>
              <Typography sx={{ ...info }} >
                숙박 15:00~ | 80,000원~
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default SearchAccmList;