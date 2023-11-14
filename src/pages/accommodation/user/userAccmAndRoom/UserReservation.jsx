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



// 슬라이드 애니메이션 주기위한 것
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


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
    // 백엔드에서 date타입으로 필요로 하기에 바꿔주는 작업 끝

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
        alert("예약페이지에서 벗어납니다");
        navigate(-1); // 현재 페이지에서 뒤로 이동
    };

    const fetchData = async () => {
        try {
            const res = await api.post("/api/user/member/userInfo");

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
    // const [tid, setTid] = useState("");
    const [tid, setTid] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [cid, setCid] = useState("");
    const [partner_order_id, setPartner_order_id] = useState("");
    const [partner_user_id, setPartner_user_id] = useState("");
    const [item_name, setItem_name] = useState("");
    const [quantity, setQuantity] = useState("");
    const [total_amount, setTotal_amount] = useState(0);
    const [vat_amount, setVat_amount] = useState(0);
    const [tax_free_amount, setTax_free_amount] = useState(0);


    // const [forKakaoPay, setForKakaoPay] = useState({
    //     cid: '',
    //     partner_order_id: '',
    //     partner_user_id: '',
    //     item_name: '',
    //     quantity: 0,
    //     total_amount: 0,
    //     vat_amount: 0,
    //     tax_free_amount: 0,
    //     approval_url: '',
    //     fail_url: '',
    //     cancel_url: '',
    // });



    console.log("dataForPayment", userMemberInfo.u_m_email);
    console.log("dataForPayment", dataForPayment);

    const [dataCheckFromBack, setDataCheckFromBack] = useState({
        kakaoReadyResponseDto: {},
        kakaoApproveInfo: {},
        amountDto: {}
    });

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



    // useEffect(() => {
    //     console.log("useEffect!@!!!!!");
    //     if (dataForPayment.u_m_email) {
    //         // axios를 사용하여 POST 요청을 보냅니다.
    //         const fetchDataForKakaoURL = async () => {
    //             const data = new FormData();

    //             console.log("이메일", dataForPayment.u_m_email);
    //             console.log("a_r_check_out", location.state.backEndData.a_r_check_out);

    //             const jsonBlob = new Blob([JSON.stringify({
    //                 u_m_email: dataForPayment.u_m_email,
    //                 u_r_name: dataForPayment.u_r_name,
    //                 u_r_phone: dataForPayment.u_r_phone,
    //                 a_r_no: location.state.backEndData.a_r_no,
    //                 u_r_check_in: toBackStartDate,
    //                 u_r_check_out: toBackEndDate,
    //                 u_r_stay_yn: u_r_stay_yn,
    //                 u_r_car_yn: u_r_car_yn,
    //                 a_r_price: a_r_price,
    //                 a_acc_name: location.state.accmName.state,
    //                 a_r_name: location.state.backEndData.a_r_name,
    //                 a_r_check_in: location.state.backEndData.a_r_check_in,
    //                 a_r_check_out: location.state.backEndData.a_r_check_out,
    //                 a_acc_no: location.state.backEndData.a_acc_no,
    //                 a_acc_name: location.state.accmName.state
    //             })], { type: "application/json" });
    //             data.append("reservationDto", jsonBlob);

    //             const response = await api.post('/api/user/reservation', data, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             })

    //             // 성공적으로 데이터를 보냈다면 response 변수를 사용할 수 있습니다.
    //             console.log("백엔드 url", response.data);
    //             setBackEndData(response.data);
    //             setNextRedirectPcUrl(response.data.kakaoReadyResponseDto.next_redirect_pc_url);
    //             // setCid(response.data.kakaoReadyResponseDto.cid);
    //             // setPartner_order_id(response.data.kakaoReadyResponseDto.partner_order_id);
    //             // setPartner_user_id(response.data.kakaoReadyResponseDto.u_m_email);
    //             // setItem_name(response.data.kakaoReadyResponseDto.item_name);
    //             // setQuantity(response.data.kakaoReadyResponseDto.quantity);
    //             // setTotal_amount(response.data.kakaoReadyResponseDto.total);
    //             // setVat_amount(response.data.kakaoReadyResponseDto.tax);
    //             // setTax_free_amount(response.data.kakaoReadyResponseDto.tax_free);
    //             // // setTid(response.data.kakaoReadyResponseDto.tid);
    //             // setCreated_at(response.data.kakaoReadyResponseDto.created_at);
    //         }
    //         fetchDataForKakaoURL();
    //     };
    // }, [dataForPayment])



    // console.log("cid!!!!!!!!!!!!!", cid);




    // const params = {
    //     cid: cid, // 카카오에서 주는 테스트 코드(고정 바꾸면 안됌)
    //     partner_order_id: partner_order_id, // 주문 요청번호(랜덤으로 uuid로 옴)
    //     partner_user_id: partner_user_id, // (사용자 이메일) u_m_email
    //     item_name: item_name, // 룸 이름(a_r_name)
    //     quantity: 1, // 수량 (1 그대로 나둠)
    //     total_amount: total_amount, // 프론트에서 넘겨주는 u_r_price(총 결제 금액)
    //     vat_amount: vat_amount, // 부가세(10프로)
    //     tax_free_amount: tax_free_amount, // 총금액 - 부가세
    //     // approval_url: `http://localhost:3000/api/payment/success?tid=${tid}`,
    //     approval_url: `http://localhost:3000/payment/success`, // 성공 경우 알아서 페이지 넘어감
    //     // 카카오에서 자동으로 토큰값을 쿼리스트링 처럼 넘겨줌 이걸 백으로 전달함
    //     fail_url: "http://localhost:3000/payment/success", // 실패한 경우
    //     cancel_url: "http://localhost:3000/payment/success", // 취소한 경우
    // };


    // const params = useMemo(() => ({
    //     cid: cid,
    //     partner_order_id: partner_order_id,
    //     partner_user_id: partner_user_id,
    //     item_name: item_name,
    //     quantity: 1,
    //     total_amount: total_amount,
    //     vat_amount: vat_amount,
    //     tax_free_amount: tax_free_amount,
    //     approval_url: `http://localhost:3000/payment/success`,
    //     fail_url: "http://localhost:3000/payment/fail",
    //     cancel_url: "http://localhost:3000/payment/cancel",
    // }), [cid, partner_order_id, partner_user_id, item_name, total_amount, vat_amount, tax_free_amount]);


    // const params = {
    //     cid: cid,
    //     partner_order_id: partner_order_id,
    //     partner_user_id: partner_user_id,
    //     item_name: item_name,
    //     quantity: 1,
    //     total_amount: total_amount,
    //     vat_amount: vat_amount,
    //     tax_free_amount: tax_free_amount,
    //     approval_url: `http://localhost:3000/payment/success`,
    //     fail_url: "http://localhost:3000/payment/fail",
    //     cancel_url: "http://localhost:3000/payment/cancel",
    // }


    // console.log("params", params);

    // useEffect(() => {
    //     if (cid !== '') {
    //         console.log("useEffect");
    //         console.log("params", params);

    //         axios({
    //             url: "https://kapi.kakao.com/v1/payment/ready", // 카카오 요청 보내는 url
    //             method: "POST", // 
    //             headers: {
    //                 Authorization: "KakaoAK 1980ead0ae347e6c0c29225e22ede43c", // admin키 있어야함
    //                 "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    //             }, params,
    //             // 방금 위에 적은 데이터들
    //         }).then((response) => { // 통신이 된다면
    //             console.log("tp : ", response.data);
    //             const { next_redirect_pc_url, tid, created_at } = response.data;
    //             // localstorage에 tid 저장
    //             window.localStorage.setItem("next_redirect_pc_url", next_redirect_pc_url);
    //             // 이 url이 클릭해서 가는게 아니라 결제버튼을 누르면 자동으로 떠야함 (QR코드임)
    //             window.localStorage.setItem("tid", tid); // 카카오에서 고정으로 주거
    //             window.localStorage.setItem("created_at", created_at); // 요청 시간
    //             // 방금 위에 3개는 백으로 함
    //             setNextRedirectPcUrl(response.data.next_redirect_pc_url);
    //             setTid(response.data.tid);
    //             setCreated_at(response.data.created_at);

    //         });
    //     }

    // }, [params.cid, params.partner_order_id, params.partner_user_id, params.item_name, params.total_amount, params.vat_amount, params.tax_free_amount]);






    // console.log("next_redirect_pc_url", nextRedirectPcUrl);
    // console.log("tid", tid);
    // console.log("created_at", created_at);





    // console.log(dataCheckFromBack);


    // useEffect(() => {
    //     if (dataForPayment.u_m_email) {
    //         const fetchDataForKakaoPay = async () => {
    //             const data = new FormData();

    //             console.log("이;메일", dataForPayment.u_m_email);
    //             console.log("a_r_check_out", location.state.backEndData.a_r_check_out);

    //             const jsonBlob = new Blob([JSON.stringify({
    //                 u_m_email: dataForPayment.u_m_email,
    //                 u_r_name: dataForPayment.u_r_name,
    //                 u_r_phone: dataForPayment.u_m_phone,
    //                 a_r_no: location.state.backEndData.a_r_no,
    //                 u_r_check_in: u_r_check_in,
    //                 u_r_check_out: u_r_check_out,
    //                 u_r_stay_yn: u_r_stay_yn,
    //                 u_r_car_yn: u_r_car_yn,
    //                 a_r_price: a_r_price,
    //                 a_acc_name: location.state.accmName.state,
    //                 a_r_name: location.state.backEndData.a_r_name,
    //                 a_r_check_in: location.state.backEndData.a_r_check_in,
    //                 a_r_check_out: location.state.backEndData.a_r_check_out,
    //                 a_acc_no: location.state.backEndData.a_acc_no,
    //                 a_acc_name: location.state.accmName.state,
    //                 next_redirect_pc_url: nextRedirectPcUrl,
    //                 tid: tid,
    //                 created_at: created_at
    //             })], { type: "application/json" });
    //             data.append("reservationDto", jsonBlob);

    //             const response = await api.post('/api/user/reservation/registConfirm', data, {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data'
    //                 }

    //             });
    //         }
    //         fetchDataForKakaoPay();
    //     };
    // }, [nextRedirectPcUrl, tid, created_at]);

    // const [cid, setCid] = useState("");
    // const [partner_order_id, setPartner_order_id] = useState("");
    // const [partner_user_id, setPartner_user_id] = useState("");
    // const [item_name, setItem_name] = useState("");
    // const [quantity, setQuantity] = useState("");
    // const [total_amount, setTotal_amount] = useState("");
    // const [vat_amount, setVat_amount] = useState("");
    // const [tax_free_amount, setTax_free_amount] = useState("");


    const [open, setOpen] = useState(false); // 모달창 오픈
    // console.log()''

    // if (open == true && tp_query !== undefined) {
    // if (tp_query) {

    const completePay = async () => {
        try {
            console.log("useEffect 결제 성공완료");
            const response = await api.get(`/api/user/reservation/success`);
            console.log("response.data", response.data);
            if (response.data == "success") {
                return (
                    <h2>
                        결제 완료 성공
                    </h2>
                );
            }
        } catch (error) {
            console.error('주문 처리 중 오류 발생:', error);
        }
    }

    // , {
    // headers: {
    //     'Content-Type': 'multipart/form-data'
    // }


    // setSuccess(response.data.status);
    // }

    // }



    useEffect(() => {



    }, [open, tp_query]);



    const PaymentModal = ({ open, onClose, url }) => {



        return (
            <Dialog open={open} onClose={onClose}>
                <div src={url} width="100%" height="500px"></div>
            </Dialog>
        );
    };

    const fetchDataForKakaoURL = async () => {
        const data = new FormData();

        console.log("이메일", dataForPayment.u_m_email);
        console.log("a_r_check_out", location.state.backEndData.a_r_check_out);

        const jsonBlob = new Blob([JSON.stringify({
            u_m_email: dataForPayment.u_m_email,
            u_r_name: dataForPayment.u_r_name,
            u_r_phone: dataForPayment.u_r_phone,
            a_r_no: location.state.backEndData.a_r_no,
            u_r_check_in: toBackStartDate,
            u_r_check_out: toBackEndDate,
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

        const response = await api.post('/api/user/reservation', data, {
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
            // const paymentWindow = window.open(nextRedirectPcUrl, '_blank');
            completePay();

            // 결제 창의 상태를 주기적으로 확인하는 함수
            const checkPaymentWindowClosed = () => {
                if (paymentWindow.closed) {
                    // 새 창이 닫혔을 때 실행할 로직
                    navigate(`/`, {
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

        // setOpen(true); // 모달창을 열어줍니다.
        console.log("useEffect!@!!!!!");
        // if (dataForPayment.u_m_email) {
        // axios를 사용하여 POST 요청을 보냅니다.

        fetchDataForKakaoURL();


        // console.log("nextRedirectPcUrl", nextRedirectPcUrl);

    }


    // useEffect(() => {
    //     if (open) { // 다이얼로그가 열려있고, 상태가 업데이트되었다고 가정할 때

    //         const timer = setTimeout(() => {
    //             navigate(`/user/payment/ready`, {
    //                 state: {
    //                     dataForPayment
    //                 }
    //             });
    //         }, 1000); // 1초 후에 페이지 이동

    //         // 타이머를 정리합니다.
    //         return () => clearTimeout(timer);
    //     }

    // }, [open, dataForPayment, navigate]);


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
                                    <span style={{ fontSize: '15px' }}> {location.state.backEndData.a_r_state} / {diffDays}박</span>  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{a_r_price}</span>원
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
                        {/* 다른 정보 및 버튼 등이 여기에 올 수 있습니다. */}
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
                            value={isChecked ? userMemberInfo.u_m_name : ''}
                            onChange={(e) => setUserMemberInfo({ ...userMemberInfo, u_m_name: e.target.value })}
                            InputLabelProps={{
                                shrink: true, // 항상 레이블을 축소 상태로 유지
                            }}
                            sx={{
                                backgroundColor: isChecked ? 'action.disabledBackground' : '', // 체크됐을 때 배경색 변경
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'action.disabled', // 테두리 색상 변경
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main', // 호버 시 테두리 색상 변경
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main', // 포커스 시 테두리 색상 변경
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
                            value={isChecked ? userMemberInfo.u_m_phone : ''}
                            onChange={(e) => setUserMemberInfo({ ...userMemberInfo, u_m_phone: e.target.value })}
                            InputLabelProps={{
                                shrink: true, // 항상 레이블을 축소 상태로 유지
                            }}
                            sx={{
                                backgroundColor: isChecked ? 'action.disabledBackground' : '', // 체크됐을 때 배경색 변경
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'action.disabled', // 테두리 색상 변경
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'primary.main', // 호버 시 테두리 색상 변경
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main', // 포커스 시 테두리 색상 변경
                                    },
                                },
                            }}
                        />
                        <Typography color="textSecondary" sx={{ mt: 2, mb: 2 }}>
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
                                {a_r_price}원
                            </Typography>
                        </Box>
                        {/* 추가 비용에 대한 항목을 여기에 추가할 수 있습니다. */}
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="body2">
                                총 결제 금액
                            </Typography>
                            <Typography variant="body1" color="secondary">
                                {a_r_price}원
                            </Typography>
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2, mr: 2 }}
                            // disabled={!setSelectedFileNames[0]}
                            onClick={handlePaymentClick}
                        >
                            결제
                        </Button>
                        {/* <PaymentModal open={open} onClose={() => setOpen(false)} url={nextRedirectPcUrl} /> */}
                    </CardContent>
                </Card>

            </CardContent>
        </Card>
    );
}

export default UserReservation;