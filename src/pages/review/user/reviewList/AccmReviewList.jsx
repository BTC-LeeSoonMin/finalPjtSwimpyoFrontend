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

export default function AccmReviewList(props) {
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
                {/* <Link to={`/user/accommodation/reviewDetail/${r_no}`} >상세보기</Link> */}
                <Link to={`/user/review/detail/${props.r_no}`} style={{textDecoration: 'none', color: 'black'}}>상세보기 &gt;</Link>
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
                >{props.u_m_nickname}</Typography>
                <Typography
                    noWrap
                    component="div"
                    sx={{
                        color: '#C8C8C8',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}
                >{props.r_reg_date}</Typography>
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
            >{props.a_r_name}</Typography>
            
            {hidden &&
                <Typography
                    noWrap
                    component="div"
                    sx={{ ...textHidden }}
                >{props.r_content}</Typography>
            } <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {hidden && <Link onClick={(e) => moreClick(e)} style={{color: 'black'}}>더보기</Link>}</Typography>
            {!hidden &&
                <Typography
                    component="div"
                    sx={{
                        width: '100%'
                    }}
                >{props.r_content}</Typography>}
                <Box sx={{...imgSlide}}>
                <img src={props.r_ri_image} style={img} />
            </Box>
            <Divider sx={{ width: '100%', mt: '1rem' }} />
        </Box>

    );

}