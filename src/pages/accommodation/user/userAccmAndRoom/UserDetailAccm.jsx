/* eslint-disable */

import React, { useEffect, useRef, useState } from 'react';
import { Backdrop, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiPaper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Modal } from '@mui/base';
import api from '../../../../hooks/RefreshTokenAuto';
import UserRoomList from './UserRoomList';
import axios from 'axios';
import KakaoMapForAccm from '../../../../components/KaokaoMapForAccm';
import '../../../../css/MapModal.css';
import CloseIcon from '@mui/icons-material/Close';
import markerForMap from '../../../../imgs/markerForMap.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const UserDetailAccm = () => {

    const allReview = (e) => {
        e.preventDefault();
        console.log("click allReview");
        navigate(`/user/accommodation/detailAccm/reviewList/${accmNum.a_acc_no}`);
    }

    const accmNum = useParams();


    const Item = styled(MuiPaper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));

    const [dataLoaded, setDataLoaded] = useState(false);


    const [backEndData, setBackEndData] = useState({
        accmData: {},
        accmImages: []
    })
    const requestData = useParams(); // 넘어온 데이터
    const navigate = useNavigate();
    const location = useLocation();

    // 수정과 삭제 버튼 클릭 시 모달 창 열기 위한 state
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [exitAnimation, setExitAnimation] = useState(false);

    // 방 등록, 목록을 위한 state
    const [rooms, setRooms] = useState([]); // 방 목록을 저장하는 상태
    const [isAddingRoom, setIsAddingRoom] = useState(false);

    // 등록에 보내기 위한 Props
    const accomNum = backEndData.accmData;

    // 업소 정보를 볼 수 있는 선택 박스 기능


    // 사진 MUI를 위한 코드시작
    const [activeStep, setActiveStep] = useState(0);
    const images = backEndData.accmImages; // 여기서는 accmImages 배열이 이미 준비

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
    // 사진 MUI를 위한 코드끝

    const handleBackClick = () => {
        navigate(-1); // 현재 페이지에서 뒤로 이동
    };



    /* 지도 모달을 위한 함수 시작 */

    useEffect(() => {
        // URL의 해시가 'locationMapModal'일 때 모달을 염
        if (location.hash === '#locationMapModal') {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [location.hash])

    const handleMapOpen = () => {
        setOpen(true);
        window.history.pushState(null, null, '#locationMapModal');
        setExitAnimation(false);
    }

    const handleMapClose = () => {
        setOpen(false);
        window.history.pushState(null, null, ' ');
        setExitAnimation(true);
        setTimeout(() => setOpen(false), 500);
    };


    const handleDeleteConfirmation = () => {
        // 삭제 버튼 클릭 시
    }

    /* 지도 모달을 위한 함수 끝 */



    const fetchData = async () => {
        try {
            const res = await api.post(`soonmin.info/api/user/accm/showAccmDetail?a_acc_no=${accmNum.a_acc_no}`);
            //  res -> 서버에서 받아온 데이터
            console.log("detail data success");

            setBackEndData({
                accmData: res.data.adminAccmDto,
                accmImages: res.data.a_i_images
            });
            setDataLoaded(true);



        } catch (error) {
            setDataLoaded(true);
            console.error("An error occurred:", error);
        }
    };


    useEffect(() => {
        fetchData(); // 비동기 함수 호출
    }, [accmNum])

    console.log("accmData", backEndData.accmData);
    console.log("accmNum", accmNum);
    console.log("accmImages", backEndData.accmImages);


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
                    <IconButton aria-label="뒤로 가기" onClick={handleBackClick} sx={{ order: -1 }} >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold", textAlign: 'center', flexGrow: 1, marginLeft: '-40px' }}>
                        상세 보기
                    </Typography>
                </Box>




                <Box sx={{ position: 'relative', width: '100%', height: '100%', mt: 3 }}>
                    {/* 큰 이미지 */}
                    <Card>
                        <CardMedia
                            component="img"
                            image={images[activeStep].a_i_image}
                            alt={`Image ${activeStep}`}
                            sx={{ height: 400 }} // 큰 이미지의 높이 설정
                        />
                    </Card>

                    {/* <IconButton onClick={scrollLeft} sx={{ position: 'absolute', left: 0, top: '50%', zIndex: 1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton onClick={scrollRight} sx={{ position: 'absolute', right: 0, top: '50%', zIndex: 1 }}>
                        <ArrowForwardIcon />
                    </IconButton> */}

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
                                key={img.a_i_image}
                                onClick={() => handleThumbnailClick(index)}
                                sx={{ ml: index !== 0 ? 1 : 0 }} // 첫 번째 이미지를 제외하고 마진 적용
                            >
                                <Card>
                                    <CardMedia
                                        component="img"
                                        src={img.a_i_image}
                                        alt={`Thumbnail ${index}`}
                                        sx={{ width: 100, height: 100 }} // 썸네일 이미지의 크기 설정
                                    />
                                </Card>
                            </IconButton>
                        ))}
                    </Box>
                </Box>


                <Box sx={{ marginBottom: '1rem', marginTop: '1rem', backgroundColor: 'white', padding: '1rem' }}>

                    <img src={markerForMap} alt="마커 이미지" style={{ width: "10px", height: "auto", marginRight: "-5px" }} /><Button onClick={handleMapOpen}>{backEndData.accmData.a_acc_address}</Button>
                    <Modal
                        open={open}
                        onClose={handleMapClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1300,
                            position: 'fixed'
                        }}
                        closeAfterTransition
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'fixed', // 모달을 화면에 고정
                                top: 0,
                                left: 0,
                                width: '100vw', // 모달의 너비를 뷰포트 너비의 100%
                                height: '100vh', // 모달의 높이를 뷰포트 높이의 100%
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                overflowY: 'auto', // 내용이 많을 경우 스크롤을 허용
                                transform: open ? 'translateY(0)' : 'translateY(100%)',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                            className={open ? 'modal-slide-up-enter' : 'modal-slide-down-exit'} // 애니메이션 클래스 적용
                        >
                            <Grid container justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item sx={{ margin: 0 }}>
                                    <IconButton
                                        edge="end"
                                        color="inherit"
                                        onClick={handleMapClose} // 모달을 닫는 함수 호출
                                        aria-label="close"
                                    >
                                        <CloseIcon />
                                    </IconButton>

                                </Grid>
                                <Grid item sx={{ margin: 0 }}>
                                    <h2>지도보기</h2>
                                </Grid>

                            </Grid>

                            <KakaoMapForAccm longitude={backEndData.accmData.a_acc_longitude} latitude={backEndData.accmData.a_acc_latitude} />
                            <Grid Container xs={12} sx={{ textAlign: 'left' }}>
                                <Box sx={{ fontSize: '15px', marginBottom: 1 }}>
                                    주소 : {backEndData.accmData.a_acc_address}
                                </Box>
                            </Grid>
                        </Box>
                    </Modal>
                </Box>


                <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '30px', mb: '1rem', fontWeight: 'bold' }}>
                    {backEndData.accmData.a_acc_name}

                </Grid>


                <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, ml: 1 }} >
                        숙소정보
                    </Typography>
                    {/* <Item sx={{ marginTop: '1rem' }}> */}
                    <Grid container sx={{ marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>주소</span> : {backEndData.accmData.a_acc_address}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>연락처 </span> : {backEndData.accmData.a_acc_phone}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>이메일 </span> : {backEndData.accmData.a_m_email}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>사업자 번호</span> : {backEndData.accmData.a_acc_bn}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>대표자 명</span> : {backEndData.accmData.a_m_name}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#f5f5f5', mt: 2 }}>

                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px' }}>
                        업소 정보
                    </Grid>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: "14px" }}>
                        <span dangerouslySetInnerHTML={{ __html: backEndData.accmData.a_acc_intro }}></span>
                    </Grid>
                </Box>

                <Item sx={{ marginTop: '2rem' }}>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px', mb: 3 }}>
                        <span style={{ fontWeight: 'bold' }}>객실 선택</span>
                    </Grid>
                    <UserRoomList accomNum={accomNum} requestData={requestData} accmName={backEndData.accmData.a_acc_name} />

                </Item>

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

            </Paper >
        </Container >
    );

}

export default UserDetailAccm;