import React from 'react';
import { Box, Container, Divider, Grid, Paper, Toolbar, Typography } from "@mui/material";
import temp1 from '../../../../assets/temp.jpg';
import temp2 from '../../../../assets/temp2.jpg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const textHidden = {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

const imgSlide = {
    display: 'flex',
    width: '100%',
    overflowX: 'auto', // 이미지가 넘칠 때 가로 스크롤바 표시
    flexWrap: 'nowrap', // 이미지들이 가로로 한 줄에 나열되도록 설정
    mt: '8px',
};

const img = {
    flex: '0 0 auto', // 이미지들이 크기를 유지하도록 설정
    width: '200px', // 각 이미지의 너비 설정
    height: '125px', // 각 이미지의 높이 설정
    marginRight: '10px', // 이미지 간 간격 설정
};

export default function AccmReviewList() {
    const [hidden, setHidden] = useState(true);

    console.log('hidden', hidden);

    const moreClick = (e) => {
        e.preventDefault();
        setHidden(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: '1rem',
        }}>
            <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {/* <Link to={`/user/accommodation/reviewDetail/${a_r_no}`} >상세보기</Link> */}
                <Link to='/user/accommodation/reviewDetail/' style={{textDecoration: 'none', color: 'black'}}>상세보기 &gt;</Link>
            </Typography>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Typography
                    noWrap
                    component="div"
                    sx={{
                        color: '#C8C8C8',
                        display: 'flex',
                        justifyContent: 'flex-first',
                        width: '100%'
                    }}
                >진범냐</Typography>
                <Typography
                    noWrap
                    component="div"
                    sx={{
                        color: '#C8C8C8',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}
                >2023-11-14</Typography>
            </Box>
            <Typography
                noWrap
                component="div"
                sx={{
                    fontWeight: 'bold',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'flex-first',
                    width: '100%', 
                    mb: '1rem',
                }}
            >디럭스</Typography>
            
            {hidden &&
                <Typography
                    noWrap
                    component="div"
                    sx={{ ...textHidden }}
                >리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용</Typography>
            } <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {hidden && <Link onClick={(e) => moreClick(e)} style={{color: 'black'}}>더보기</Link>}</Typography>
            {!hidden &&
                <Typography
                    component="div"
                    sx={{
                        width: '100%'
                    }}
                >더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기</Typography>}
                <Box sx={{...imgSlide}}>
                <img src={temp1} style={img} />
                <img src={temp2} style={img} />
                <img src={temp1} style={img} />
                <img src={temp2} style={img} />
            </Box>
            <Divider sx={{ width: '100%', mt: '1rem' }} />
        </Box>

    );

}