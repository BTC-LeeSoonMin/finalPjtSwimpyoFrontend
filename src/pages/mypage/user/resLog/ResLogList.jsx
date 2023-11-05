import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import accmImg from '../../../../assets/temp.jpg';
import api from '../../../../hooks/RefreshTokenAuto';
import ResLogFilter from './ResLogFilter';

const list = {
    bgcolor: 'background.paper',
    height: '10rem',
    mt: '1rem',
    padding: '1rem',
};

const font = {
    fontSize: '15px',
    fontWeight: 'normal',
};

const titleFont = {
    fontSize: '16px',
    fontWeight: 'bold',
};

const info = {
    fontSize: '15px',
    fontWeight: 'normal',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'normal',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    color: 'black'
}

function ResLogList() {

    const [log, setLog] = useState(false);   
    const [accName, setAccName] = useState('');   // 숙박업소 이름
    const [content, setContent] = useState('');   // 종류
    const [state, setState] = useState('');       // 숙박/대실
    const [checkInDate, setCheckInDate] = useState('');   //체크인 날짜
    const [checkOutDate, setCheckOutDate] = useState('');   //체크인 날짜
    const [car, setCar] = useState('');   //차량/도보
    const [checkInTime, setCheckInTime] = useState('');       //가격
    const [checkOutTime, setCheckOutTime] = useState('');       //가격

    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    useEffect(() => {
        console.log('SearchList start');

        api.post("/api/user/mypage/resLogList",
            config,
        )
            .then(response => {
                console.log(response.data);

                if (response.data === null) {
                    console.log('예약 내역이 없습니다.');
                } else {
                    setLog(true);
                    setAccName(response.data.a_acc_name);
                    setContent(response.data.a_r_content);
                    setState(response.data.a_r_state);
                    setCheckInDate(response.data.u_r_check_in);
                    setCheckOutDate(response.data.u_r_check_out);
                    setCar(response.data.u_r_car_yn);
                    setCheckInTime(response.data.a_r_check_in);
                    setCheckOutTime(response.data.a_r_check_out);
                }

            })
            .catch(error => console.log(error));

    }, []);

    return (
        <Box sx={{ ...list, borderRadius: '10px', mr: '1rem' }}>
            {log && 
            <Grid container>
                <Grid item xs={2}>
                    <img style={{ maxHeight: '125px', maxWidth: '200px' }} src={accmImg} alt="Accm Image" />
                </Grid>
                <Grid item xs={7} sx={{ pl: '1rem' }}>
                    <Box sx={{ borderRadius: '13px', mr: '1rem' }}>
                        <Typography sx={{ ...titleFont }}>
                            숙박업소 이름
                        </Typography>
                        <Typography sx={{ ...font }} >
                            룸 이름 1객실 1주차, 연박 불가, 넷플릭스 가능
                        </Typography>
                        <Typography sx={{ ...font }} >
                            2023.12.25(월) ~ 2023.12.26(화) | 숙박
                        </Typography>
                        <Typography sx={{ ...font }} >
                            도보
                        </Typography>
                        <Typography sx={{ ...font }} >
                            체크인 18:00 | 체크아웃 12:00
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Link style={{ ...info }}>상세보기 &gt;</Link>
                    <Link style={{ ...info }}>
                        <Button variant="contained" sx={{ color: 'white', bgcolor: 'skyblue', fontWeight: 'bold', mt: '65px' }}>리뷰작성</Button>
                    </Link>
                </Grid>
            </Grid>}
            {!log && <Typography>예약 내역이 없습니다.</Typography>}
        </Box>
    );
}

export default ResLogList;