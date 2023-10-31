import React, { useEffect, useState } from 'react';
import { Backdrop, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton } from '@mui/material';
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
import { useNavigate } from 'react-router-dom';
import ConfirmOrClose from '../../../components/ConfirmOrClose';
import { Modal } from '@mui/base';
import AdminRoomList from './AdminRoomList';


const AdminDetailAccm = () => {


    const Item = styled(MuiPaper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));


    const [accmData, setAccmData] = useState({});
    const [images, setImages] = useState([]);
    const requestData = { a_m_no: 1 };
    const navigate = useNavigate();

    // 수정과 삭제 버튼 클릭 시 모달 창 열기 위한 state
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // 방 등록, 목록을 위한 state
    const [rooms, setRooms] = useState([]); // 방 목록을 저장하는 상태
    const [isAddingRoom, setIsAddingRoom] = useState(false);


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

    const handleEditConfirmation = () => {
        // 이곳에서 수정 페이지로 이동 또는 관련 작업 수행
        // handleClose(); // 작업을 수행한 후 모달 닫기
        navigate(`/admin/accommodation/modifyAccm/${requestData.a_m_no}`)

    };

    const handleDeleteConfirmation = () => {
        // 삭제 버튼 클릭 시
    }

    /* 수정과 삭제를 위한 함수 끝 */




    const handleRoomDetails = (roomId) => {
        // 방 상세 정보 페이지로 이동
        // 이동하는 방법은 여러 가지가 있을 수 있으며, 라우팅 라이브러리를 사용하거나
        // React Router 등을 통해 페이지로 이동할 수 있습니다.
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post(`http://localhost:8090/api/admin/accm/show_accm_detail?a_m_no=${requestData.a_m_no}`);
                //  res -> 서버에서 받아온 데이터
                console.log("detail data success");
                // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.
                console.log("확인 : ", res.data);
                setAccmData(res.data.adminAccmDto);
                console.log("accmData", accmData);
                setImages(res.data.a_i_images);
                // const imageUrls = images.a_i_images;
                // setImages(imageUrls);


            } catch (error) {
                console.error("An error occurred:", error);
            }
        };

        fetchData(); // 비동기 함수 호출
    }, []);
    console.log("accmData", accmData);
    console.log("image", images);

    // useEffect(() => {
    //     if (Array.isArray(images)) {
    // console.log(images)
    // // const imageUrls = images.map(item => item.imageUrl);
    // const imageUrls = res.data.a_i_images
    // setImages(imageUrls);
    //     } else {
    //         console.error("images 상태가 배열 형식이 아닙니다:", images);
    //     }
    // }, [images]);

    return (

        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton aria-label="수정" onClick={() => handleClickOpen('edit')}>
                        <EditIcon />
                    </IconButton>
                    <ConfirmOrClose open={openEdit} close={() => close('edit')} confirmation={() => handleEditConfirmation(accmData.a_acc_name)} words="수정" />

                    <IconButton aria-label="삭제" onClick={() => handleClickOpen('delete')}>
                        <DeleteIcon />
                    </IconButton>
                    <ConfirmOrClose open={openDelete} close={() => close('delete')} confirmation={handleDeleteConfirmation} words="삭제" />

                </Box>

                <Box sx={{ marginBottom: '1rem', marginTop: '1rem', backgroundColor: 'white', padding: '1rem' }}>
                    <Carousel>
                        {images.map((imageUrl, index) => (
                            <Paper key={index} sx={{ height: '180px', overflow: 'hidden' }}>
                                <img src={imageUrl} alt={`Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </Paper>
                        ))}
                    </Carousel>
                </Box>


                <Item sx={{ marginTop: '1rem' }}>


                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '30px' }}>
                        {accmData.a_acc_name}
                        <Grid item xs={10} sx={{ mt: '10px' }}>
                            <Divider variant="left" sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>

                </Item>

                <Item sx={{ marginTop: '1rem' }}>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        주소 : {accmData.a_acc_address}
                    </Grid>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        연락처 : {accmData.a_acc_phone}
                    </Grid>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        이메일 : {accmData.a_m_email}
                    </Grid>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        사업자 번호 : {accmData.a_acc_bn}
                    </Grid>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        대표자 명 : {accmData.a_m_name}
                    </Grid>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={10} sx={{ mt: '10px' }}>
                            <Divider variant="left" sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>
                </Item>

                <Item sx={{ marginTop: '1rem' }}>
                    {/* <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}> */}
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px' }}>
                        업소 정보
                    </Grid>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <span dangerouslySetInnerHTML={{ __html: accmData.a_acc_intro }}></span>
                    </Grid>

                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                        <Grid item xs={10} sx={{ mt: '10px' }}>
                            <Divider variant="left" sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>

                </Item>

                <Item sx={{ marginTop: '1rem' }}>
                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '20px' }}>
                        객실
                    </Grid>
                    <AdminRoomList />

                </Item>

            </Paper>
        </Container>


    );
}




export default AdminDetailAccm;