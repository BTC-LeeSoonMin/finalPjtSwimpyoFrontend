import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import accmImg from '../../../../assets/temp.jpg';
import api from '../../../../hooks/RefreshTokenAuto';
import ResLogFilter from './ResLogFilter';

const list = {
    bgcolor: 'background.paper',
    height: '10rem',
    mt: '1rem',
    padding: '1rem',
    width: '62rem'
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
    fontSize: '15px',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'normal',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    color: 'black'
}

function ResLogList(props) {

    return (
        <Box sx={{ ...list, borderRadius: '10px', mr: '1rem' }}>

            <Grid container>
                <Grid item xs={3}>
                    <div style={{ width: '220px', height: '125px', overflow: 'hidden' }}>
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={props.a_i_image} alt="Accm Image" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ borderRadius: '13px', mr: '1rem' }}>
                        <Typography sx={{ ...titleFont }}>
                            {props.a_acc_name}
                        </Typography>
                        <Typography sx={{ ...font }} noWrap>
                            {props.a_r_name} {props.a_r_content}
                        </Typography>
                        <Typography sx={{ ...font }} >
                            {props.u_r_check_in} ~ {props.u_r_check_out} | {props.a_r_state}
                        </Typography>
                        {<Typography sx={{ ...font }} >
                            차량 유무 {props.u_r_car_yn}
                        </Typography>}
                        <Typography sx={{ ...font }} >
                            {props.u_r_check_in_time}{props.a_r_check_in} | {props.u_r_check_out_time}{props.a_r_check_out}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Link style={{ ...info }} to={`/user/myPage/resLogDetail/${props.u_r_no}`}>상세보기 &gt;</Link>
                    <Link style={{ ...info }}>
                        <Button variant="contained" sx={{ color: 'white', bgcolor: 'skyblue', fontWeight: 'bold', mt: '65px', 
                        '&:hover': { backgroundColor: 'skyblue' } }}>리뷰작성</Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ResLogList;