import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const textHidden = {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

export default function BestHotel(props) {
    const navigate = useNavigate();

    const bestAccm = (e) => {
        e.preventDefault();
        navigate(`/user/accommodation/detailAccm/${props.a_acc_no}`);
    
      };

    return (
        <Card sx={{ width: 200, m: '5px' }}>
            <CardActionArea onClick={(e) => bestAccm(e)}>
                <CardMedia
                    component="img"
                    height="100"
                    image={props.a_i_image}
                    alt="a_i_image"
                />
                <CardContent>
                    <Typography gutterBottom component="div" sx={{...textHidden}}>
                        {props.a_acc_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{...textHidden}}>
                        누적예약건수{props.예약수}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}