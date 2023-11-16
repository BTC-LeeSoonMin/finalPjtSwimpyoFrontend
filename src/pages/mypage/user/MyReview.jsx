import React from 'react';
import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import AccmReviewList from '../../review/user/reviewList/AccmReviewList';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../hooks/RefreshTokenAuto';

const list = {
    align: 'center',
    bgcolor: 'background.paper',
    height: '20rem',
    mt: '1rem',
    padding: '1rem',
};

export default function MyReview() {
    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        api.post("/api/user/mypage/getReviewList",)
            .then((response) => {
                if (response.data != null) {
                    console.log('MyReview', response.data);
                    // setReviewList(response.data);
                }
            });
    }, []);

    return (
        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: 'auto' }}>
                <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
                    내가 작성한 리뷰
                </Typography>
                {(reviewList.length != 0) && reviewList.map((item) => (<AccmReviewList {...item} />))}
                <Box sx={{ ...list, borderRadius: '10px' }}>
                    {(reviewList.length == 0) &&
                        <Typography sx={{ mt: '1rem', textAlign: 'center' }}>
                            작성한 리뷰가 없습니다.
                        </Typography>}
                </Box>
            </Paper>
        </Container>
    );

}