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

function SearchAccmList(props) {
  const [star, setStar] = useState(4);

  return (
    
    <Grid item xs={6}>
      <Box sx={{ ...list, borderRadius: '10px', mr: '1rem' }}>
        <Grid container>
          <Grid item xs={4}>
            <img style={{ maxHeight: '125px', maxWidth: '200px' }} src={props.a_i_image} alt="Accm Image" />
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ borderRadius: '13px', mr: '1rem' }}>
              <Typography sx={{ ...titleFont }}>
                {props.a_acc_name}
              </Typography>
              <Rating name="read-only" value={star} readOnly size="small" />
              <Typography sx={{ ...font }} >
                {props.a_acc_kind}
              </Typography>
              <Typography sx={{ ...font }} >
                {props.a_acc_address}
              </Typography>
              <Typography sx={{ ...info, mt: '10px' }} >
                {props.a_r_state} {props.a_r_check_in} |  {props.a_r_price}원~
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default SearchAccmList;