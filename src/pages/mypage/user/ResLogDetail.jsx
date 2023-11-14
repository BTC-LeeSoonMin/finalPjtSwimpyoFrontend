import React from 'react';
import { Box, Button, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import temp1 from '../../../assets/temp.jpg';
import temp2 from '../../../assets/temp2.jpg';

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

export default function ResLogDetail() {

    const [hidden, setHidden] = useState(true);

    console.log('hidden', hidden);

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
                        <Typography sx={{ ...left, color: '#C8C8C8' }}>주문번호</Typography>
                        <Typography sx={{ ...right, color: '#C8C8C8' }}>예약한 날</Typography>
                    </Box>
                    <Typography sx={{ ...right, fontWeight: 'bold', color: '#C8C8C8' }}>이용여부</Typography>
                </Box>
                <Divider sx={{ width: '100%', mt: '1rem' }} />
                <Typography component="h1" variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                    상품 정보
                </Typography>
                {/* <Link style={linkStyle} to={`/user/accommodation/detailAccm/${props.a_acc_no}`}> */}
                <Link style={linkStyle} to="">
                    <Grid container>

                        <Grid item xs={4}><img src={temp1} style={img} /></Grid>

                        <Grid item xs={8}>
                            <Typography sx={{ ...font, fontWeight: 'bold', fontSize: '18px', }}>
                                숙박업소 이름
                            </Typography>
                            <Typography sx={{ ...font, fontWeight: 'bold', }}>
                                룸이름 룸소개글
                            </Typography>
                            <Typography sx={{ ...font }} noWrap>
                                차량유무 N
                            </Typography>
                            <Typography sx={{ ...font }} noWrap>
                                체크인 날짜 ~ 체크아웃 날짜 | 숙박/대실
                            </Typography>
                            <Typography sx={{ ...font }} noWrap>
                                체크인 시간 | 체크아웃 시간
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
                        <Typography sx={{ ...right }}>은졀미</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Typography sx={{ ...left }}>연락처</Typography>
                        <Typography sx={{ ...right }}>010-1234-4567</Typography>
                    </Box>
                </Box>
                <Divider sx={{ width: '100%', mt: '1rem' }} />
                <Typography component="h1" variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
                    결제 금액
                </Typography>
                <Box sx={{ ...box }}>
                    <Box sx={{ display: 'flex', width: '100%' }}>
                        <Typography sx={{ ...left }}>가격</Typography>
                        <Typography sx={{ ...right, fontWeight: 'bold', fontSize: '18px', }}>80000원</Typography>
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