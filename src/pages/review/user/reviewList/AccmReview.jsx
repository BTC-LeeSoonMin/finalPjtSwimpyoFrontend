import React from 'react';
import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import AccmReviewList from './AccmReviewList';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../../../hooks/RefreshTokenAuto';

export default function AccmReview() {
    const [reviewData, setReviewData] = useState([]);
    const [reviewImg, setReviewImg] = useState([]);
    const {a_acc_no} = useParams();

    useEffect(() => {
        if(parseInt(a_acc_no) > 0) {
            api.get("https://soonmin.info/api/user/review/showReviewList",{ params: { "a_acc_no": parseInt(a_acc_no) } })
            .then((response) => {
                if (response.data != null) {
                    setReviewData(response.data.userReviewDto);
                    setReviewImg(response.data.userReviewImgList);
                }
            }).catch((error) => {
                console.error('Error ', error);
            });
        }
        
    }, [a_acc_no]);

    return(
        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: 'auto' }}>
                <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
                    업소 후기
                </Typography>
                {(reviewData.length !== 0) && reviewData.map((item, index) => (
                    <AccmReviewList key={index} {...item} reviewImg={reviewImg} />
                ))}
                {(reviewData.length === 0) && <Box sx={{ display: 'flex',flexDirection: 'column',alignItems: 'center', mt: '1rem' }}>작성된 리뷰가 없습니다.</Box>}
            </Paper>
        </Container>
    );

}