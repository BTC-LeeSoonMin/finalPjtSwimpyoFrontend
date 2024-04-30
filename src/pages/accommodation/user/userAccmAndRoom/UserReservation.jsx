/* eslint-disable */

import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Box,
    Checkbox,
    Toolbar,
    IconButton,
    AppBar,
    Divider,
    FormLabel,
    Paper,
    Slide,
    Dialog,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import api from "../../../../hooks/RefreshTokenAuto";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import dayjs from "dayjs";



const UserReservation = () => {

    const token = useSelector((store) => store.accessToken.value);
    console.log('토큰 값', token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    const [userMemberInfo, setUserMemberInfo] = useState({
        u_m_email: '',
        u_m_name: '',
        u_m_phone: '',
    });

    const [userResName, setUserResName] = useState("");
    const [userResPhone, setUserResPhone] = useState("");

    const queryString = location.search;
    const tp_query = queryString.split("=")[1];
    const [backEndData, setBackEndData] = useState({});


    console.log("location", location);
    console.log("a_accm_name", location.state.accmName.state);

    // 넘어온 데이터 중 날짜 데이터 변환 시작
    const startDate = new Date(location.state.resDates.startDate);
    const endDate = new Date(location.state.resDates.endDate);

    const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' };

    const u_r_check_in = startDate.toLocaleDateString('ko-KR', options).replace(/\. /g, '.');
    const u_r_check_out = endDate.toLocaleDateString('ko-KR', options).replace(/\. /g, '.');

    console.log("startDate", startDate);
    // 넘어온 데이터 중 날짜 데이터 변환 끝

    // 날짜의 차이를 계산 시작
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // 날짜의 차이를 계산 끝

    // 백엔드에서 date타입으로 필요로 하기에 바꿔주는 작업 시작
    const convertDateToISO = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    const toBackStartDate = convertDateToISO(startDate);
    const toBackEndDate = convertDateToISO(endDate);

    const toBackStartDateStringType = dayjs(startDate).format("YYYY-MM-DD");
    const toBackEndDateStringType = dayjs(endDate).format("YYYY-MM-DD");

    // dayjs(toBackEndDate).format("YYYY-MM-DD")
    // 백엔드에서 date타입으로 필요로 하기에 바꿔주는 작업 끝
    console.log("toBackStartDateStringType", toBackStartDateStringType);

    // 날짜 -1일 전 무료취소 가능 시작
    const forCancelDate = new Date(startDate);
    forCancelDate.setDate(forCancelDate.getDate() - 1);
    const cancellationDate = forCancelDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short'
    }).replace(/\. /g, '.'); // 연도와 월 사이의 공백을 제거
    // 날짜 -1일 전 무료취소 가능 시작

    // 가격 계산 시작
    const a_r_price = (location.state.backEndData.a_r_price) * diffDays
    // 가격 계산 끝

    // 숙박일 경우 => Y, 대실일 경우 => N 데이터 바꾸기
    const u_r_stay_yn = location.state.backEndData.a_r_state === '숙박' ? 'Y' : 'N';
    // 숙박일 경우 => Y, 대실일 경우 => N 데이터 바꾸기

    console.log(u_r_stay_yn);

    const handleBackClick = () => {
        navigate(-1); // 현재 페이지에서 뒤로 이동
    };

    const fetchData = async () => {
        try {
            const res = await api.post("soonmin.info/api/user/member/userInfo");

            console.log(res.data);
            setUserMemberInfo({
                u_m_email: res.data.u_m_email,
                u_m_name: res.data.u_m_name,
                u_m_phone: res.data.u_m_phone
            });
            // setA_m_no(res.data.a_m_no);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [location]);

    console.log("u_m_name", userMemberInfo.u_m_name);

    const [dataForPayment, setDataForPayment] = useState({
        u_m_email: '',
        u_r_name: '',
        u_r_phone: '',
        a_r_no: '',
        u_r_check_in: '',
        u_r_check_out: '',
        u_r_stay_yn: '',
        u_r_car_yn: '',
        a_r_price: '',
        a_acc_name: '',
        a_r_name: '',
        a_r_check_in: '',
        a_r_check_out: '',
        a_acc_no: '',
        a_acc_name: ''
    });

    // 도보인지 차량인지
    const [transportation, setTransportation] = useState('도보');

    const handleTransportChange = (event) => {
        setTransportation(event.target.value);
    };
    const u_r_car_yn = transportation === '차량' ? 'Y' : 'N'
    // 도보인지 차량인지

    // 체크됬을 때 이름과 전화번호 시작
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    // 체크됬을 때 이름과 전화번호 끝

    // 결제를 위해 카카오 테스트 코드, 주문 요청번호

    const [nextRedirectPcUrl, setNextRedirectPcUrl] = useState("");

    console.log("dataForPayment", userMemberInfo.u_m_email);
    console.log("dataForPayment", dataForPayment);


    useEffect(() => {

        setDataForPayment(prevData => ({
            ...prevData,
            u_m_email: userMemberInfo.u_m_email,
            u_r_name: userMemberInfo.u_m_name,
            u_r_phone: userMemberInfo.u_m_phone,
            a_r_no: location.state.backEndData.a_r_no,
            u_r_check_in: u_r_check_in,
            u_r_check_out: u_r_check_out,
            u_r_stay_yn: u_r_stay_yn,
            u_r_car_yn: u_r_car_yn,
            a_r_price: a_r_price,
            a_acc_name: location.state.accmName.state,
            a_r_name: location.state.backEndData.a_r_name,
            a_r_check_in: location.state.backEndData.a_r_check_in,
            a_r_check_out: location.state.backEndData.a_r_check_out,
            a_acc_no: location.state.backEndData.a_acc_no,
            a_acc_name: location.state.accmName.state
        }));

    }, [userMemberInfo]);

    const fetchDataForKakaoURL = async () => {
        const data = new FormData();

        let resName = "";
        let resPhone = "";

        if (isChecked === true) {
            resName = userMemberInfo.u_m_name;
            resPhone = userMemberInfo.u_m_phone;
        } else {
            resName = userResName;
            resPhone = userResPhone;
        }

        console.log("이메일", dataForPayment.u_m_email);
        console.log("a_r_check_out", location.state.backEndData.a_r_check_out);

        const jsonBlob = new Blob([JSON.stringify({
            u_m_email: dataForPayment.u_m_email,
            u_r_name: resName,
            u_r_phone: resPhone,
            a_r_no: location.state.backEndData.a_r_no,
            u_r_check_in: toBackStartDateStringType,
            u_r_check_out: toBackEndDateStringType,
            u_r_stay_yn: u_r_stay_yn,
            u_r_car_yn: u_r_car_yn,
            a_r_price: a_r_price,
            a_acc_name: location.state.accmName.state,
            a_r_name: location.state.backEndData.a_r_name,
            a_r_check_in: location.state.backEndData.a_r_check_in,
            a_r_check_out: location.state.backEndData.a_r_check_out,
            a_acc_no: location.state.backEndData.a_acc_no,
            a_acc_name: location.state.accmName.state
        })], { type: "application/json" });
        data.append("reservationDto", jsonBlob);

        const response = await api.post('soonmin.info/api/user/reservation', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        // 성공적으로 데이터를 보냈다면 response 변수를 사용할 수 있습니다.
        console.log("백엔드 url", response.data);
        setBackEndData(response.data);
        setNextRedirectPcUrl(response.data.kakaoReadyResponseDto.next_redirect_pc_url);

    }

    useEffect(() => {

        if (nextRedirectPcUrl) {
            const paymentWindow = window.open(nextRedirectPcUrl, '_blank');


            // 결제 창의 상태를 주기적으로 확인하는 함수
            const checkPaymentWindowClosed = () => {
                if (paymentWindow.closed) {
                    // 새 창이 닫혔을 때 실행할 로직
                    navigate(`/user/myPage`, {
                        state: {
                            // 필요한 상태 데이터 전달
                        }
                    });
                } else {
                    // 새 창이 아직 열려 있으면 다시 확인
                    setTimeout(checkPaymentWindowClosed, 500); // 0.5초 후에 다시 확인
                }
            };

            // 최초 실행
            checkPaymentWindowClosed();
        }

    }, [nextRedirectPcUrl]);

    const handlePaymentClick = () => {
        console.log("useEffect!@!!!!!");
        fetchDataForKakaoURL();
    }


    return (
        <Card variant="outlined" sx={{ maxWidth: 600, m: 'auto', mt: 4 }}>
            <CardContent>
                <AppBar position="static" color="transparent" elevation={0}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleBackClick} aria-label="뒤로 가기">
                            <ArrowBackIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="h6" noWrap>
                                예약
                            </Typography>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Card sx={{ maxWidth: 'md', m: 'auto', mt: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom sx={{ fontSize: '16px' }}>
                            숙소
                        </Typography>
                        <Typography gutterBottom sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                            {location.state.accmName.state}
                        </Typography>
                        <Typography gutterBottom sx={{ fontSize: '12px' }}>
                            체크인 시 배정
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box>
                                <Typography variant="subtitle1" color="textSecondary">
                                    체크인
                                </Typography>
                                <Typography variant="h6">
                                    <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{u_r_check_in} {location.state.backEndData.a_r_check_in}</span>
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" color="textSecondary">
                                    체크아웃
                                </Typography>
                                <Typography variant="h6">
                                    <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{u_r_check_out} {location.state.backEndData.a_r_check_out}</span>
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 1 }} >
                            <Box>

                                <Typography variant="body1" gutterBottom sx={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '15px' }}> {location.state.backEndData.a_r_state} / {diffDays}박</span>  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{a_r_price.toLocaleString('ko-KR')}</span>원
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ color: 'green' }}>
                                    무료취소 ({cancellationDate} 00:00까지)
                                </Typography>
                            </Box>
                        </Box>

                        <Paper variant="outlined" sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ flexGrow: 1, mr: 2 }}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">방문수단</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="transportation"
                                        name="transportation"
                                        value={transportation}
                                        onChange={handleTransportChange}
                                    >
                                        <FormControlLabel value="도보" control={<Radio />} label="도보" />
                                        <FormControlLabel value="차량" control={<Radio />} label="차량" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Paper>

                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ maxWidth: 'md', m: 'auto', mt: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            이용자 정보
                        </Typography>
                        <Typography color="textSecondary">
                            상품 이용 시 필요한 필수 정보입니다.
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                    color="primary"
                                />
                            }
                            label="예약자 정보와 동일합니다."
                            sx={{ display: 'block', mt: 2 }}
                        />
                        <Divider sx={{ my: 2 }} />
                        <TextField
                            required
                            label="성명"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            disabled={isChecked}
                            value={isChecked ? userMemberInfo.u_m_name : userResName}  // 체크 시 백엔드에서 가져온 값, 아닐 시 입력 값 사용
                            onChange={(e) => {
                                if (!isChecked) {
                                    setUserResName(e.target.value)
                                } else {
                                    setUserMemberInfo({ ...userMemberInfo, u_m_name: e.target.value });
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                backgroundColor: isChecked ? 'action.disabledBackground' : '',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'action.disabled',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: isChecked ? 'action.disabled' : 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: isChecked ? 'action.disabled' : 'primary.main',
                                    },
                                },
                            }}
                        />
                        <TextField
                            required
                            label="휴대폰 번호"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            disabled={isChecked}
                            value={isChecked ? userMemberInfo.u_m_phone : userResPhone}  // 체크 시 백엔드에서 가져온 값, 아닐 시 입력 값 사용
                            onChange={(e) => {
                                if (!isChecked) {
                                    setUserResPhone(e.target.value)
                                } else {
                                    setUserMemberInfo({ ...userMemberInfo, u_m_phone: e.target.value });
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{
                                backgroundColor: isChecked ? 'action.disabledBackground' : '',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'action.disabled',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: isChecked ? 'action.disabled' : 'primary.main',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: isChecked ? 'action.disabled' : 'primary.main',
                                    },
                                },
                            }}
                        />

                        <Typography color="textSecondary" sx={{ mt: 2, mb: 2, fontSize: 10 }}>
                            입실하시는 분의 이름과 휴대전화 번호를 입력해주세요. 본인 확인 및 안전한 거래를 위해 필수정보로 게스트 정보 등에는 공개되지 않습니다.
                        </Typography>
                    </CardContent>
                </Card>

                <Card variant="outlined" sx={{ maxWidth: 'md', m: 'auto', mt: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom component="div">
                            결제 금액
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body2">
                                상품 금액
                            </Typography>
                            <Typography variant="body1">
                                {a_r_price.toLocaleString('ko-KR')}원
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body2">
                                총 결제 금액
                            </Typography>
                            <Typography variant="body1" color="secondary">
                                {a_r_price.toLocaleString('ko-KR')}원
                            </Typography>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: '#F7323F', color: 'white', fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#F7323F',
                                }
                            }}

                            onClick={handlePaymentClick}
                        >
                            결제
                        </Button>

                    </CardContent>
                </Card>

            </CardContent>
        </Card>
    );
}

export default UserReservation;