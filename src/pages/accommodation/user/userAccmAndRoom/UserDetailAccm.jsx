import React, { useEffect, useState } from 'react';
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



const UserDetailAccm = () => {


    const accmNum = useParams();

    // const accmNumTest = 7;

    const Item = styled(MuiPaper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));

    const [dataLoaded, setDataLoaded] = useState(false);

    // const [accmData, setAccmData] = useState({}); // 백엔드에서 넘어온 데이터 넣는곳
    // const [images, setImages] = useState([]);
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


    /* 지도 모달을 위한 함수 시작 */

    useEffect(() => {
        // URL의 해시가 'locationMapModal'일 때 모달을 엽니다.
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
            const res = await api.post(`/api/user/accm/showAccmDetail?a_acc_no=${accmNum.a_acc_no}`);
            //  res -> 서버에서 받아온 데이터
            console.log("detail data success");
            // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.

            // setAccmData(res.data.adminAccmDto);
            setBackEndData({
                accmData: res.data.adminAccmDto,
                accmImages: res.data.a_i_images
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
                minHeight="100vh" // This ensures that the Box takes the full viewport height
                sx={{
                    backgroundColor: 'background.default', // Use theme background color
                    color: 'text.primary', // Use theme text color
                }}
            >
                {/* You can include a CircularProgress component to indicate loading status */}
                <CircularProgress color="inherit" />
                <Typography variant="h3" component="h1">
                    Loading...
                </Typography>
            </Box>
        );
    }

    return (


        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '700px', margin: 'auto' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
                        나의 업소 관리
                    </Typography>
                </Box>


                <Box sx={{ marginBottom: '1rem', marginTop: '1rem', backgroundColor: 'white', padding: '1rem' }}>
                    <Carousel sx={{ zIndex: 0 }}>
                        {backEndData.accmImages.map((imageUrl, index) => (
                            <Paper key={index} sx={{ height: '180px', overflow: 'hidden', zIndex: -100 }}>
                                <img src={imageUrl.a_i_image} alt={`Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'contain', zIndex: -200 }} />
                            </Paper>
                        ))}
                    </Carousel>
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
                                position: 'fixed', // 모달을 화면에 고정합니다.
                                top: 0,
                                left: 0,
                                width: '100vw', // 모달의 너비를 뷰포트 너비의 100%로 설정합니다.
                                height: '100vh', // 모달의 높이를 뷰포트 높이의 100%로 설정합니다.
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                overflowY: 'auto', // 내용이 많을 경우 스크롤을 허용합니다.
                                transform: open ? 'translateY(0)' : 'translateY(100%)',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                            className={open ? 'modal-slide-up-enter' : 'modal-slide-down-exit'} // 애니메이션 클래스를 적용합니다.
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
                                <Box sx={{ fontSize: '15px', marginBottom: 2 }}>
                                    주소 : {backEndData.accmData.a_acc_address}
                                </Box>
                            </Grid>
                        </Box>
                    </Modal>
                </Box>


                <Item sx={{ marginTop: '1rem' }}>

                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '30px' }}>
                        {backEndData.accmData.a_acc_name}
                        <Grid item xs={10} sx={{ mt: '10px' }}>
                            <Divider variant="left" sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>

                </Item>

                <Item sx={{ marginTop: '1rem' }}>
                    <Grid container sx={{ marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                주소 : {backEndData.accmData.a_acc_address}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                연락처 : {backEndData.accmData.a_acc_phone}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                이메일 : {backEndData.accmData.a_m_email}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                사업자 번호 : {backEndData.accmData.a_acc_bn}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                대표자 명 : {backEndData.accmData.a_m_name}
                            </Box>
                        </Grid>
                        <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                            <Grid item xs={10} sx={{ mt: '10px' }}>
                                <Divider variant="left" sx={{ width: '100%' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Item>

                <Item sx={{ marginTop: '1rem' }}>
                    {/* <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}> */}
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px' }}>
                        업소 정보
                    </Grid>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <span dangerouslySetInnerHTML={{ __html: backEndData.accmData.a_acc_intro }}></span>
                    </Grid>

                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={10} sx={{ mt: '10px' }}>
                            <Divider variant="left" sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>

                </Item>

                <Item sx={{ marginTop: '1rem' }}>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px', mb: 3 }}>
                        객실 선택
                    </Grid>
                    <UserRoomList accomNum={accomNum} requestData={requestData} accmName={backEndData.accmData.a_acc_name} />
                </Item>

            </Paper >
        </Container >
    );

}

export default UserDetailAccm;