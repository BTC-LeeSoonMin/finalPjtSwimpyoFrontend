import * as React from 'react';
import { Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function ReservationStatusList(props) {

    return (
        <>
            <Item sx={{ boxShadow: 'none' }}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item xs={1}>{props.u_r_name}</Grid>
                    <Grid item xs={3}>{props.a_r_name}</Grid>
                    <Grid item xs={1}>{props.u_r_stay_yn}</Grid>
                    <Grid item xs={1}>{props.u_r_car_yn}</Grid>
                    <Grid item xs={2}>{props.u_r_phone}</Grid>
                    <Grid item xs={1}>{props.u_r_check_in_time}{props.a_r_check_in}/{props.u_r_check_out_time}{props.a_r_check_out}</Grid>
                    <Grid item xs={3}>{props.u_r_check_in}~{props.u_r_check_out}</Grid>
                </Grid>
            </Item>
            <Divider orientation="horizontal" variant="fullWidth" />
        </>
    );
}