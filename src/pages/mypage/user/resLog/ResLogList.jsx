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
                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={accmImg} alt="Accm Image" />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ borderRadius: '13px', mr: '1rem' }}>
                        <Typography sx={{ ...titleFont }}>
                            숙박업소 이름
                        </Typography>
                        <Typography sx={{ ...font }} >
                            룸 이름 1객실 1주차, 연박 불가, 넷플릭스 가능
                        </Typography>
                        <Typography sx={{ ...font }} >
                            2023.12.25(월) ~ 2023.12.26(화) | 숙박
                        </Typography>
                        <Typography sx={{ ...font }} >
                            도보
                        </Typography>
                        <Typography sx={{ ...font }} >
                            체크인 18:00 | 체크아웃 12:00
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Link style={{ ...info }}>상세보기 &gt;</Link>
                    <Link style={{ ...info }}>
                        <Button variant="contained" sx={{ color: 'white', bgcolor: 'skyblue', fontWeight: 'bold', mt: '65px' }}>리뷰작성</Button>
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ResLogList;