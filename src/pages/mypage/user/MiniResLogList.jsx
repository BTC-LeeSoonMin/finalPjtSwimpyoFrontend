import { Box, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

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

export default function MiniResLogList(props) {
    return (
        <Link style={linkStyle} to={`/user/myPage/resLogDetail/${props.u_r_no}`}>
            <Grid container sx={{ mt: '1rem', mb: '1rem' }}>
                <Grid item xs={4} sx={{ ...textHidden, display: 'flex', alignItems: 'flex-first' }}>
                    {props.a_acc_name}
                </Grid>
                <Grid item xs={4} sx={{ ...textHidden, display: 'flex', alignItems: 'flex-first', pl: '10px', pr: '10px' }}>
                    {props.a_r_name}
                </Grid>
                <Grid item xs={4} sx={{ ...textHidden, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    {props.u_r_check_in}
                </Grid>
            </Grid>
            <Divider sx={{ width: '100%', mt: '1rem' }} />
        </Link>
    );
}