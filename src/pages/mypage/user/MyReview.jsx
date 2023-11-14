import React from 'react';
import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";
import AccmReviewList from '../../review/user/reviewList/AccmReviewList';

export default function MyReview() {


    return(
        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: 'auto' }}>
                <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
                    내가 작성한 리뷰
                </Typography>
                <AccmReviewList />
                <AccmReviewList />
                <AccmReviewList />
                <AccmReviewList />
                <AccmReviewList />
            </Paper>
        </Container>
    );

}