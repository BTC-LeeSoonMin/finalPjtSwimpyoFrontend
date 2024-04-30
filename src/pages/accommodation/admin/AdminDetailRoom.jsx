import React, { useEffect, useState, useRef } from 'react';
import { Backdrop, CircularProgress, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmOrClose from '../../../components/ConfirmOrClose';
import { Modal } from '@mui/base';
import AdminRoomList from './AdminRoomList';
import api from '../../../hooks/RefreshTokenAuto';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AdminDetailRoom = () => {

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

    const roomNum = useParams();
    const navigate = useNavigate();


    // 수정과 삭제 버튼 클릭 시 모달 창 열기 위한 state
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

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
    // 사진 MUI를 위한 코드끝




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

    const handleEditConfirmation = () => {
        // 이곳에서 수정 페이지로 이동 또는 관련 작업 수행
        // handleClose(); // 작업을 수행한 후 모달 닫기
        navigate(`/admin/accommodation/modifyRoom/${roomNum.a_r_no}/${backEndData.roomData.a_m_no}`);

    };

    console.log("roomNum", roomNum);

    const handleDeleteConfirmation = () => {
        // 삭제 버튼 클릭 시
    }

    console.log("backEndData.roomData.a_acc_no", backEndData.roomData.a_acc_no);
    const handleBack = () => {
        navigate(`/admin/accommodation/detailAccm/${backEndData.roomData.a_m_no}`)
    }

    /* 수정과 삭제 상세페이지 가기를 위한 함수 끝 */


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
            try {
                const res = await api.post(`soonmin.info/api/admin/room/showRoomDetail?a_r_no=${roomNum.a_r_no}`);
                //  res -> 서버에서 받아온 데이터
                console.log("detail data success");
                // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.

                // setAccmData(res.data.adminAccmDto);
                setBackEndData({
                    roomData: res.data.adminRoomDto,
                    roomImages: res.data.r_i_images
                });
                setDataLoaded(true);

            } catch (error) {
                setDataLoaded(true);
                console.error("An error occurred:", error);
            }
        };

        fetchData(); // 비동기 함수 호출
    }, [roomNum]);

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

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton aria-label="뒤로 가기" onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography component="h1" variant="h5" sx={{ mt: 1, fontWeight: "bold", textAlign: 'center', flexGrow: 1, marginLeft: '-10px' }}>
                        방 상세 보기
                    </Typography>
                    <Box>
                        <IconButton aria-label="수정" onClick={() => handleClickOpen('edit')}>
                            <EditIcon />
                        </IconButton>
                        <ConfirmOrClose open={openEdit} close={() => close('edit')} confirmation={() => handleEditConfirmation(backEndData.roomData.a_r_name)} words="수정" />

                        <IconButton aria-label="삭제" onClick={() => handleClickOpen('delete')}>
                            <DeleteIcon />
                        </IconButton>
                        <ConfirmOrClose open={openDelete} close={() => close('delete')} confirmation={handleDeleteConfirmation} words="삭제" />
                    </Box>
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

                <Item sx={{ marginTop: '1rem' }}>


                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '30px', mb: '1rem', fontWeight: 'bold' }}>
                        {backEndData.roomData.a_r_name}
                    </Grid>

                </Item>


                <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h6" gutterBottom sx={{ mb: 2, ml: 1 }} >
                        방 정보
                    </Typography>
                    <Grid container sx={{ marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>숙박/대실</span> : {backEndData.roomData.a_r_state}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>가격</span> : {backEndData.roomData.a_r_price.toLocaleString('ko-KR')} 원
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>체크인 시간</span> : {backEndData.roomData.a_r_check_in} {convertAMAndPM(backEndData.roomData.a_r_check_in)}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                <span style={{ fontWeight: "bold" }}>체크아웃 시간</span> : {backEndData.roomData.a_r_check_out} {convertAMAndPM(backEndData.roomData.a_r_check_out)}
                            </Box>
                        </Grid>
                    </Grid>

                </Box>

                <Box sx={{ p: 2, borderRadius: '4px', backgroundColor: '#f5f5f5', mt: 2 }}>

                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px' }}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 1 }} >
                            방 안내사항
                        </Typography>

                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginTop: 1, marginBottom: 2 }}>
                                <div style={{ whiteSpace: 'pre-line' }}>
                                    <span dangerouslySetInnerHTML={{ __html: backEndData.roomData.a_r_content }}></span>
                                </div>
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Paper>
        </Container >
    );

}

export default AdminDetailRoom;