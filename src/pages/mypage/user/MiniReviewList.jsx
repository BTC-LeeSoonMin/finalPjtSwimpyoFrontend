import { Box, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../hooks/RefreshTokenAuto";

const linkStyle = {
    color: 'black',
    textDecoration: 'none',
};

const textHidden = {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontFamily: 'GangwonEdu_OTFBoldA',
    fontSize: '18px',
};

export default function MiniReviewList(props) {
    const [email, setEmail] = useState('');

    useEffect(() => {

        api.post("http://43.203.71.198/api/user/member/userInfo",)
          .then((response) => {
            if (response.data != null) {
                setEmail(response.data.u_m_email);
            }
          });
    
      }, []);

    return (
        <Link style={linkStyle} to={`/user/review/detail/${email}/${props.r_no}`}>
            <Grid container sx={{ mt: '1rem', mb: '1rem' }}>
                <Grid item xs={4} sx={{ ...textHidden, display: 'flex', alignItems: 'flex-first' }}>
                {props.a_acc_name}
                </Grid>
                <Grid item xs={4} sx={{ ...textHidden, display: 'flex', alignItems: 'flex-first', pl: '10px', pr: '10px' }}>
                {props.a_r_name}
                </Grid>
                <Grid item xs={4} sx={{ ...textHidden, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {dayjs(props.r_reg_date).format("YYYY-MM-DD")}
                </Grid>
            </Grid>
            <Divider sx={{ width: '100%', mt: '1rem' }} />
        </Link>
    );
}