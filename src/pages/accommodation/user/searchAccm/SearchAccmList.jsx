import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const linkStyle = {
  color: 'black',
  textDecoration: 'none',
};

const list = {
  bgcolor: 'background.paper',
  height: '8rem',
  mt: '1rem',
  padding: '1rem',
};

const font = {
  fontSize: '15px',
  fontWeight: 'normal',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
};

const titleFont = {
  fontSize: '16px',
  fontWeight: 'bold',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
};

const info = {
  textAlign: 'right',
  fontSize: '15px',
  fontWeight: 'normal',
}

function SearchAccmList(props) {

  return (

    <Grid item xs={6}>
      <Link style={linkStyle} to={`/user/accommodation/detailAccm/${props.a_acc_no}`}>
        <Box sx={{ ...list, borderRadius: '10px', mr: '1rem' }}>
          <Grid container>
            <Grid item xs={4}>
              <div style={{ width: '125px', height: '125px', overflow: 'hidden' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={props.a_i_image} alt="Accm Image" />
              </div>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ borderRadius: '13px', mr: '1rem', mt: '10px' }}>
                <Typography sx={{ ...titleFont }}>
                  {props.a_acc_name}
                </Typography>
                <Typography sx={{ ...font }} >
                  {props.a_acc_kind}
                </Typography>
                <Typography sx={{ ...font }} >
                  {props.a_acc_address}
                </Typography>
                <Typography sx={{ ...info, mt: '1rem' }} >
                  {props.a_r_state} {props.a_r_check_in} |  {props.a_r_price.toLocaleString('ko-KR')}원~
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Link>
    </Grid>
  );
}

export default SearchAccmList;