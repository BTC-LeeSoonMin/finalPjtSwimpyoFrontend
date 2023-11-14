import React from 'react';
import { Box, Container, Divider, Grid, Paper, Typography } from "@mui/material";

const font = {
    fontSize: '15px',
    fontWeight: 'normal',
};

export default function ResRogDetail() {


    return(
        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: 'auto' }}>
                <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
                    예약내역 상세
                </Typography>
                <Typography sx={{ ...font }} noWrap>
                    예약한 날
                </Typography>
                <Typography sx={{ ...font }} noWrap>
                    주문번호
                </Typography>
            </Paper>
        </Container>
    );

}