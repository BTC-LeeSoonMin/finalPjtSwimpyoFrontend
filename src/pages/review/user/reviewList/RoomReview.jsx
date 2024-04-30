import React from 'react';
import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import AccmReviewList from './AccmReviewList';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import api from '../../../../hooks/RefreshTokenAuto';

export default function RoomReview() {
    const [reviewData, setReviewData] = useState([]);
    const [reviewImg, setReviewImg] = useState([]);

    const { a_acc_no, a_r_no } = useParams();
    console.log('AccmReview a_acc_no', a_acc_no);
    console.log('AccmReview a_r_no', a_r_no);

    useEffect(() => {
        if (parseInt(a_acc_no) > 0 && parseInt(a_r_no) > 0) {
            api.get("https://soonmin.info/api/user/review/showReviewListRoom", { params: { "a_r_no": parseInt(a_r_no), "a_acc_no": parseInt(a_acc_no) } })
                .then((response) => {
                    console.log('RoomReview', response.data);
                    if (response.data != null) {
                        setReviewData(response.data.userReviewDto);
                        setReviewImg(response.data.r_ri_images);
                    }
                }).catch((error) => {
                    console.error('Error ', error);
                });
        }

    }, [a_acc_no, a_r_no]); 

    return (
        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: 'auto' }}>
                <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
                    룸 후기
                </Typography>
                {(reviewData.length !== 0) && reviewData.map((item, index) => (
                    <AccmReviewList key={index} {...item} reviewImg={reviewImg} />
                ))}
                {(reviewData.length === 0) && <Box sx={{ display: 'flex',flexDirection: 'column',alignItems: 'center', mt: '1rem' }}>작성된 리뷰가 없습니다.</Box>}
            </Paper>
        </Container>
    );

}