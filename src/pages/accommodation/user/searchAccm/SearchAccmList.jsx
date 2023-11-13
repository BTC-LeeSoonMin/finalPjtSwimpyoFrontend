import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import accmImg from '../../../../assets/temp.jpg';
import Rating from '@mui/material/Rating';
import api from '../../../../hooks/RefreshTokenAuto';

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
      <Link style={linkStyle} to={`/user/accommodation/detailAccm/${props.a_acc_no}`}>
        <Box sx={{ ...list, borderRadius: '10px', mr: '1rem' }}>
          <Grid container>
            <Grid item xs={4}>
              <div style={{ width: '125px', height: '125px', overflow: 'hidden' }}>
                <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={props.a_i_image} alt="Accm Image" />
              </div>
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
      </Link>
    </Grid>
  );
}

export default SearchAccmList;