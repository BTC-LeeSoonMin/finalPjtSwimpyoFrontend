/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Backdrop, Card, CardMedia, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Carousel from 'react-material-ui-carousel';
import MuiPaper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import api from '../../../../hooks/RefreshTokenAuto';
import DatePicker from 'react-date-picker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarForRes from '../../../../components/CalendarForRes';
import { useSelector } from 'react-redux';
import { differenceInCalendarDays } from 'date-fns';
import dayjs from 'dayjs';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const UserDetailRoom = () => {

    const allReview = (e) => {
        e.preventDefault();
        console.log("click allReview");
        // navigate('/user/room/reviewList', { state: a_r_no } );
        navigate(`/user/accommodation/detailRoom/reviewList/${backEndData.roomData.a_acc_no}/${roomNum.a_r_no}`);
    }

    // 리덕스 툴킷에서 로그인 확인을 위한 코드 시작
    const token = useSelector((store) => store.accessToken.value);
    console.log('토큰 값', token);
    // 리덕스 툴킷에서 로그인 확인을 위한 코드 끝

    const accmName = useLocation();

    const Item = styled(MuiPaper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));

    const [dataLoaded, setDataLoaded] = useState(false);

    const [backEndData, setBackEndData] = useState({
        roomData: {},
        roomImages: []
    })

    // 달력 선택시 숙소 방 정보와  날짜 등 모든 것을 넣어서 예약 창으로 전달
    const [sendToResData, setSendToResData] = useState({
        accmName: '',
        backEndData: {}, // 초기 backEndData 상태
        resDates: {}
    });

    // 달력
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });


    // 백엔드에서 date타입으로 필요로 하기에 바꿔주는 작업 시작
    const convertDateToISO = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }
    // 백엔드에서 date타입으로 필요로 하기에 바꿔주는 작업 끝

    const [effectChange, setEffectChange] = useState(false);

    const nightsCount = differenceInCalendarDays(dates.endDate, dates.startDate);

    const [selectedDate, setSelectedDate] = useState(new Date());


    const roomNum = useParams();
    const navigate = useNavigate();


    const [reservationStatus, setReservationStatus] = useState("");

    // 사진 MUI를 위한 코드시작
    const [activeStep, setActiveStep] = useState(0);
    const images = backEndData.roomImages; // 여기서는 roomImages 배열이 이미 준비

    const handleThumbnailClick = (index) => {
        setActiveStep(index);
    };
    const thumbnailContainerRef = useRef();

    const scrollLeft = () => {
        thumbnailContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    };

    const scrollRight = () => {
        thumbnailContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    };
    // 사진 MUI를 위한 코드 끝



    // 수정과 삭제 버튼 클릭 시 모달 창 열기 위한 state
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);


    /* 수정과 삭제를 위한 함수 시작 */

    const handleClickOpen = (type) => {
        // 수정과 삭제 버튼 클릭 시 실행
        if (type === 'edit') {
            setOpenEdit(true); // 수정 버튼 클릭 시 수정 모달을 열도록
        } else if (type === 'delete') {
            setOpenDelete(true); // 삭제 버튼 클릭 시 삭제 모달을 열도록
        }
    }

    const close = (type) => {
        if (type === 'edit') {
            setOpenEdit(false);
        } else if (type === 'delete') {
            setOpenDelete(false);
        }
    };

    console.log(backEndData.roomData.a_m_no);

    // 선택 날짜 함수
    const handleDateChange = (date) => {
        setSelectedDate(date); // 선택된 날짜를 업데이트합니다.
    };


    // const calendarDataChange = (date) => {
    //     console.log("날짜 정보 확인 ", date);
    //     setSendToResData({
    //         backEndData: backEndData,
    //         resDates: date
    //     });
    // }

    const calendarDataChange = (dates) => {
        console.log("날짜 정보 확인 ", dates);
        setSendToResData(prev => ({
            ...prev,
            backEndData: backEndData.roomData,
            resDates: dates,
            accmName: accmName
        }));
        console.log("sendToResData", sendToResData);
    }

    console.log("effectChange", effectChange);

    useEffect(() => {
        if (dates.startDate && dates.endDate) {
            calendarDataChange(dates);
        }
    }, [dates]);

    // useEffect(() => {
    //     console.log("sendToResData 업데이트됨:", sendToResData);
    // }, [sendToResData]);

    console.log("roomNum", roomNum);

    const handleBack = () => {
        navigate(-1)
    }

    /* 수정과 삭제 상세페이지 가기를 위한 함수 끝 */


    const handleMoveToReservation = () => {
        if (!token) {
            alert('로그인이 필요한 서비스입니다.');
            navigate(`/user/member/signIn`);
        } else if (nightsCount < 1) {
            alert('최소 1박 이상 선택해야 예약이 가능합니다.');
        }
        else {
            alert('객실 예약 페이지로 이동합니다');
            navigate(`/user/accommodation/reservation/${sendToResData.backEndData.a_acc_no}/${sendToResData.backEndData.a_r_no}`, { state: sendToResData });
        }
    }

    // 들어오는 시간에 따라 AM과 PM으로 변경하는 함수
    const convertAMAndPM = (time) => {

        const [hours, minutes] = time.split(':') // 시간과 분을 구분
        const hoursInt = parseInt(hours, 10); // 시간 정수로 변환

        if (hoursInt > 12) {
            return "PM";
        }

        return "AM"
    }


    useEffect(() => {
        const fetchData = async () => {
            console.log("sendToResData!!!", sendToResData);
            try {
                const res = await api.post(`http://localhost:8090/api/user/room/showRoomDetail?a_r_no=${roomNum.a_r_no}`);
                //  res -> 서버에서 받아온 데이터
                console.log("detail data success");
                // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.

                // setAccmData(res.data.adminAccmDto);
                setBackEndData({
                    roomData: res.data.adminRoomDto,
                    roomImages: res.data.r_i_images
                });
                setDataLoaded(true);
                // setImages(res.data.a_i_images);
                // const imageUrls = images.a_i_images;
                // setImages(imageUrls);


            } catch (error) {
                setDataLoaded(true);
                console.error("An error occurred:", error);
            }
        };

        fetchData(); // 비동기 함수 호출
    }, [roomNum]);



    const fetchDataFromBack = async () => {

        // if (effectChange == true) {
        try {
            // const toBackStartDate = convertDateToISO(sendToResData.resDates.startDate);
            // const toBackEndDate = convertDateToISO(sendToResData.resDates.endDate);
            const toBackStartDate = dayjs(sendToResData.resDates.startDate).format("YYYY-MM-DD");
            const toBackEndDate = dayjs(sendToResData.resDates.endDate).format("YYYY-MM-DD");
            console.log("toBackStartDate", toBackStartDate);
            console.log("toBackEndDate", toBackEndDate);


            // 숙박일 경우 => Y, 대실일 경우 => N 데이터 바꾸기
            const u_r_stay_yn = sendToResData.backEndData.a_r_state == '숙박' ? 'Y' : 'N';
            // 숙박일 경우 => Y, 대실일 경우 => N 데이터 바꾸기
            const data = new FormData();

            console.log("sendToResData!!!!", sendToResData);


            const jsonBlob = new Blob([JSON.stringify({

                a_r_no: sendToResData.backEndData.a_r_no,
                u_r_check_in: toBackStartDate,
                u_r_check_out: toBackEndDate,
                u_r_stay_yn: u_r_stay_yn,

                a_acc_no: sendToResData.backEndData.a_acc_no,

            })], { type: "application/json" });
            data.append("reservationDto", jsonBlob);


            const res = await api.post(`http://localhost:8090/api/user/reservation/ready`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            //  res -> 서버에서 받아온 데이터
            console.log("detail data success");

            if (res.data.status == "fail") {
                // alert("이미 마감된 숙소입니다");
                setReservationStatus("예약마감");
            } else {
                setReservationStatus("예약가능");
            }

        } catch (error) {
            console.error("An error occurred:", error);
        }
        // };
    }



    useEffect(() => {
        fetchDataFromBack(); // 비동기 함수 호출
    }, [sendToResData, dates.endDate]);


    console.log("roomNum", roomNum);

    console.log("backEndData.roomImages", backEndData.roomImages);




    if (!dataLoaded) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                }}
            >
                <CircularProgress color="inherit" />
                <Typography variant="h3" component="h1">
                    Loading...
                </Typography>
            </Box>
        );
    }

    return (
        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '900px', margin: 'auto' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <IconButton aria-label="뒤로 가기" onClick={handleBack} sx={{ order: -1 }} >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold", textAlign: 'center', flexGrow: 1, marginLeft: '-40px' }}>
                        객실 상세
                    </Typography>
                </Box>


                <Box sx={{ position: 'relative', width: '100%', height: '100%', mt: 3 }}>
                    {/* 큰 이미지 */}
                    <Card>
                        <CardMedia
                            component="img"
                            image={images[activeStep]}
                            alt={`Image ${activeStep}`}
                            sx={{ height: 400 }} // 큰 이미지의 높이 설정
                        />
                    </Card>

                    <IconButton onClick={scrollLeft} sx={{ position: 'absolute', left: 0, top: '50%', zIndex: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton onClick={scrollRight} sx={{ position: 'absolute', right: 0, top: '50%', zIndex: 1 }}>
                        <ArrowForwardIcon />
                    </IconButton>

                    {/* 썸네일 이미지들 */}
                    <Box
                        ref={thumbnailContainerRef}
                        sx={{
                            display: 'flex',
                            overflowX: 'scroll',
                            justifyContent: 'center',
                            mt: 2,
                            '&::-webkit-scrollbar': { height: '10px' },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: 'grey' },
                            '&::-webkit-scrollbar-track': { backgroundColor: 'white' }
                        }}
                    >
                        {images.map((img, index) => (
                            <IconButton
                                key={img}
                                onClick={() => handleThumbnailClick(index)}
                                sx={{ ml: index !== 0 ? 1 : 0 }} // 첫 번째 이미지를 제외하고 마진 적용
                            >
                                <Card>
                                    <CardMedia
                                        component="img"
                                        src={img}
                                        alt={`Thumbnail ${index}`}
                                        sx={{ width: 100, height: 100 }} // 썸네일 이미지의 크기 설정
                                    />
                                </Card>
                            </IconButton>
                        ))}
                    </Box>
                </Box>

                <Item sx={{ marginTop: '1rem', mb: '1rem' }}>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '30px' }}>
                        <CalendarForRes startDate={dates.startDate}
                            endDate={dates.endDate}
                            setDates={setDates} />

                    </Grid>
                </Item>


                <Item sx={{ marginTop: '1rem', mb: '1rem' }}>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '30px', fontWeight: 'bold' }}>
                        {backEndData.roomData.a_r_name}
                    </Grid>
                </Item>

                <Box sx={{ p: 2, borderRadius: '5px', backgroundColor: '#f5f5f5' }}>

                    <Grid container sx={{ marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={6}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ backgroundColor: "lightgrey", borderRadius: '4px', padding: '2px 2px' }}> 숙박/대실</span>
                                <span style={{ fontWeight: "Bold" }}>{backEndData.roomData.a_r_state}</span>
                            </Box>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ backgroundColor: "lightgrey", borderRadius: '4px', padding: '2px 2px' }}> 체크인 시간</span> <span style={{ fontWeight: "Bold" }}>{backEndData.roomData.a_r_check_in} {convertAMAndPM(backEndData.roomData.a_r_check_in)}</span>
                            </Box>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ backgroundColor: "lightgrey", borderRadius: '4px', padding: '2px 2px' }}> 체크아웃 시간</span> <span style={{ fontWeight: "Bold" }}>{backEndData.roomData.a_r_check_out} {convertAMAndPM(backEndData.roomData.a_r_check_out)}</span>
                            </Box>
                        </Grid>

                        <Grid item xs={6} sx={{ margin: 0 }}>
                            <Box sx={{ fontSize: '22px', textAlign: 'right', marginBottom: 0, fontWeight: "Bold", ml: "20px", mt: "5px" }}>
                                {backEndData.roomData.a_r_price.toLocaleString('ko-KR')} 원
                            </Box>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', margin: 0, textAlign: 'right' }}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    disabled={reservationStatus === "예약마감"} // 예약마감일 경우 버튼을 비활성화합니다.
                                    sx={{
                                        mt: 3, mb: 2, width: 'auto', fontWeight: 'bold',
                                        backgroundColor: reservationStatus === "예약마감" ? 'grey' : "#F7323F", // 예약마감일 경우 회색, 아니면 검정색
                                        borderColor: 'white',
                                        '&:hover': {
                                            backgroundColor: reservationStatus === "예약마감" ? 'grey' : '#F7323F',
                                        },
                                    }}
                                    onClick={() => handleMoveToReservation(backEndData.roomData.a_r_no)}
                                >


                                    {reservationStatus === "예약마감" ? "예약마감" : "예약하기"}
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>

                </Box>



                <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#f5f5f5', mt: 2 }}>

                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px' }}>
                        업소 정보

                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginTop: 2, marginBottom: 2 }}>
                                <div style={{ whiteSpace: 'pre-line' }}>
                                    <span dangerouslySetInnerHTML={{ __html: backEndData.roomData.a_r_content }}></span>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Item sx={{ marginTop: '1rem' }}>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px', mb: 3 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3, mb: 2, backgroundColor: '#F7323F', color: 'white', fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#F7323F',
                                }
                            }}
                            onClick={(e) => allReview(e)}
                        >
                            후기 전체보기
                        </Button>
                    </Grid>
                </Item>

            </Paper>
        </Container >
    );

}

export default UserDetailRoom;