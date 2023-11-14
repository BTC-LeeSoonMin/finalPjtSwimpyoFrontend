import React from 'react';
import { Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import temp1 from '../../../assets/temp.jpg';
import temp2 from '../../../assets/temp2.jpg';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import api from '../../../hooks/RefreshTokenAuto';

const linkStyle = {
    color: 'black',
    textDecoration: 'none',
};

const img = {
    flex: '0 0 auto',
    width: '200px',
    height: '125px',
    marginRight: '10px',
};

const font = {
    fontSize: '15px',
    fontWeight: 'normal',
    mb: '5px'
};

const box = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    mt: '1rem',
}

const left = {
    display: 'flex',
    justifyContent: 'flex-first',
    width: '100%'
}

const right = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
}

const today = dayjs();

export default function ResLogDetail() {
    const { u_r_no } = useParams();
    

    const [resLog, setResLog] = useState([]);
    const [use, setUse] = useState('');

    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    useEffect(() => {
        api.get("/api/user/mypage/GetRezDetail",{ params: { "u_r_no": u_r_no } },)
            .then((response) => {
               
                if (response.data != null) {
                    console.log('resLogDetail', response.data);
                    setResLog(response.data);

                    if(response.data.u_r_check_in > dayjs(today).format("YYYY-MM-DD")) {
                        console.log('이용전', response.data.u_r_check_in);
                        setUse('이용전');
                    } else if(response.data.u_r_check_in == dayjs(today).format("YYYY-MM-DD")) {
                        console.log('이용일', response.data.u_r_check_in);
                        setUse('이용일');
                    } else if(response.data.u_r_check_in < dayjs(today).format("YYYY-MM-DD")) {
                        console.log('이용완료', response.data.u_r_check_in);
                        setUse('이용완료');
                    }
                }
            }).catch((error) => {
                // 실패

            });

    }, []);

    return (
        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: 'auto' }}>
                <Box sx={{ ...box }}>
                    <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
                        예약내역 상세
                    </Typography>
                    <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                        {/* <Link to={`/user/accommodation/reviewDetail/${a_r_no}`} >상세보기</Link> */}
                        {/* <Link to='/user/accommodation/reviewDetail/' style={{textDecoration: 'none', color: 'black'}}>상세보기 &gt;</Link> */}
                    </Typography>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Typography sx={{ ...left, color: '#34A853', fontWeight: "bold" }}>{use}</Typography>
                        <Typography sx={{ ...right, color: '#C8C8C8' }}>{dayjs(resLog.u_r_reg_date).format("YYYY-MM-DD")}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ width: '100%', mt: '1rem' }} />
                <Typography component="h1" variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                    상품 정보
                </Typography>
                {/* <Link style={linkStyle} to={`/user/accommodation/detailAccm/${resLog.a_acc_no}`}> */}
                <Link style={linkStyle} to="">
                    <Grid container sx={{mt: '1rem'}}>

                        <Grid item xs={4}><img src={resLog.a_i_image} style={img} /></Grid>

                        <Grid item xs={8}>
                            <Typography sx={{ ...font, fontWeight: 'bold', fontSize: '18px', }}>
                            {resLog.a_acc_name}
                            </Typography>
                            <Typography sx={{ ...font, fontWeight: 'bold', }}>
                            {resLog.a_r_name} {resLog.a_r_content}
                            </Typography>
                            <Typography sx={{ ...font }} noWrap>
                                차량유무 {resLog.u_r_car_yn}
                            </Typography>
                            <Typography sx={{ ...font }} noWrap>
                            {resLog.u_r_check_in} ~ {resLog.u_r_check_out} | {resLog.a_r_state}
                            </Typography>
                            <Typography sx={{ ...font }} noWrap>
                            {resLog.u_r_check_in_time} {resLog.a_r_check_in} | {resLog.u_r_check_out_time} {resLog.a_r_check_out}
                            </Typography>
                        </Grid>

                    </Grid>
                </Link>
                <Divider sx={{ width: '100%', mt: '1rem' }} />
                <Typography component="h1" variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                    예약자 정보
                </Typography>
                <Box sx={{ ...box }}>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Typography sx={{ ...left }}>이름</Typography>
                        <Typography sx={{ ...right }}>{resLog.u_m_name}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Typography sx={{ ...left }}>연락처</Typography>
                        <Typography sx={{ ...right }}>{resLog.u_m_phone}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ width: '100%', mt: '1rem' }} />
                <Typography component="h1" variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                    결제 금액
                </Typography>
                <Box sx={{ ...box }}>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Typography sx={{ ...left }}>가격</Typography>
                        <Typography sx={{ ...right, fontWeight: 'bold', fontSize: '18px', }}>{resLog.a_r_price}원</Typography>
                    </Box>
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3, mb: 2, backgroundColor: 'skyblue', color: 'white', fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: 'skyblue',
                        }
                    }}
                >
                    후기 작성하기
                </Button>
            </Paper>
        </Container>
    );

}