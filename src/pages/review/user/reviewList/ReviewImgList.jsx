import React from 'react';
import { Box, Container, Divider, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const textHidden = {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

const imgSlide = {
    display: 'flex',
    width: '100%',
    overflowX: 'auto',
    flexWrap: 'nowrap',
    mt: '8px',
};

const img = {
    flex: '0 0 auto',
    width: '200px',
    height: '125px',
    marginRight: '10px',
    objectFit: 'cover'
};

export default function ReviewImgList({ reviewImg, r_no }) {

   

    return (
        <>
            {/* {reviewImg.map((item) => (
                <img src={imageUrl} style={img} />))} */}
            
        </>

    );

}