import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export default function BestHotel(props) {

    return (
        <Card sx={{ width: 200, m: '5px' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100"
                    image={props.a_i_image}
                    alt="a_i_image"
                />
                <CardContent>
                    <Typography gutterBottom component="div">
                        {props.a_acc_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        누적예약건수{props.예약수}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );

}