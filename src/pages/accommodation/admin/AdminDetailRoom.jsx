import React, { useEffect, useState } from 'react';
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
                const res = await api.post(`http://localhost:8090/api/admin/room/showRoomDetail?a_r_no=${roomNum.a_r_no}`);
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
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton aria-label="뒤로 가기" onClick={handleBack}>
                        <ArrowBackIcon />
                    </IconButton>
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

                <Box sx={{ marginBottom: '1rem', marginTop: '1rem', backgroundColor: 'white', padding: '1rem' }}>
                    <Carousel>
                        {backEndData.roomImages.map((imageUrl, index) => (
                            <Paper key={index} sx={{ height: '180px', overflow: 'hidden' }}>
                                <img src={imageUrl} alt={`Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </Paper>
                        ))}
                    </Carousel>
                </Box>


                <Item sx={{ marginTop: '1rem' }}>


                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '30px' }}>
                        {backEndData.roomData.a_r_name}
                        <Grid item xs={10} sx={{ mt: '10px' }}>
                            <Divider variant="left" sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>

                </Item>

                <Item sx={{ marginTop: '1rem' }}>
                    <Grid container sx={{ marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                숙박/대실 : {backEndData.roomData.a_r_state}
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                가격 : {backEndData.roomData.a_r_price.toLocaleString('ko-KR')} 원
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                체크인 시간 : {backEndData.roomData.a_r_check_in} {convertAMAndPM(backEndData.roomData.a_r_check_in)}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                체크아웃 시간 : {backEndData.roomData.a_r_check_out} {convertAMAndPM(backEndData.roomData.a_r_check_out)}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ fontSize: '15px', textAlign: 'left', marginBottom: 2 }}>
                                방 총 개수 : {backEndData.roomData.a_r_count} 개
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

                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={10} sx={{ mt: '10px' }}>
                            <Divider variant="left" sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>

                </Item>

                <Item sx={{ marginTop: '1rem' }}>


                </Item>

            </Paper>
        </Container >
    );

}

export default AdminDetailRoom;