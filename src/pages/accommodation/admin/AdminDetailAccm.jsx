import React, { useEffect, useState } from 'react';
import { Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton } from '@mui/material';
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


const AdminDetailAccm = () => {


    const Item = styled(MuiPaper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none'
    }));


    const [data, setData] = useState([]);
    const [images, setImages] = useState([]);
    const requestData = { a_m_no: 1 };
    const navigate = useNavigate();

    // 수정과 삭제 버튼 클릭 시 모달 창 열기 위한 state
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

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
    };

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
        navigate(`/admin/accommodation/modifyAccm/${data.a_m_no}`)

    };

    const handleDeleteConfirmation = () => {
        // 삭제 버튼 클릭 시
    }

    /* 수정과 삭제를 위한 함수 끝 */


    const handleAddRoom = () => {
        setIsAddingRoom(true);
    };

    const handleSaveRoom = () => {
        // 여기에서 방을 등록하고 서버에 저장하는 작업을 수행합니다.
        const newRoom = {
            // 새 방의 정보를 생성
        };

        setRooms([...rooms, newRoom]);
        setIsAddingRoom(false);
    };

    const handleRoomDetails = (roomId) => {
        // 방 상세 정보 페이지로 이동
        // 이동하는 방법은 여러 가지가 있을 수 있으며, 라우팅 라이브러리를 사용하거나
        // React Router 등을 통해 페이지로 이동할 수 있습니다.
    };

    useEffect(() => {
        getSpringData();

    }, []);

    function getSpringData() {
        axios.post(`http://localhost:8090/api/admin/accm/show_accm_detail?a_m_no=${requestData.a_m_no}`).then((res) => { // 이 요청에 a_m_no파라미터를 함께 보내어 특정 데이터를 요청하고 응답
            //  res -> 서버에서 받아온 데이터
            console.log("detail data success");
            setData(res.data); // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.
            console.log(res.data);
            const receivedImages = res.data.a_acc_image; // 이미지 데이터 추출을 한다.

            // images가 배열인지 확인
            if (Array.isArray(receivedImages)) { // 이미지 데이터가 배열 형식으로 제공되는 경우에만 가능하다.
                // 이미지 URL을 추출하여 이미지 슬라이더에 표시
                const imageUrls = receivedImages.map(item => item.imageUrl);
                setImages(imageUrls);
            } else {
                console.error("이미지 데이터를 찾을 수 없습니다.");
            }
        })
            .catch((error) => {
                console.error("에러 발생.", error);
            })
    };


    return (

        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton aria-label="수정" onClick={() => handleClickOpen('edit')}>
                        <EditIcon />
                    </IconButton>
                    <ConfirmOrClose open={openEdit} close={() => close('edit')} confirmation={() => handleEditConfirmation(data.a_acc_name)} words="수정" />

                    <IconButton aria-label="삭제" onClick={() => handleClickOpen('delete')}>
                        <DeleteIcon />
                    </IconButton>
                    <ConfirmOrClose open={openDelete} close={() => close('delete')} confirmation={handleDeleteConfirmation} words="삭제" />

                </Box>

                <Box sx={{ marginBottom: '1rem', marginTop: '1rem', backgroundColor: 'white', padding: '1rem' }}>
                    <Carousel>
                        {images.map((imageUrl, index) => (
                            <Paper key={index} sx={{ height: '180px' }}>
                                <img src={imageUrl} alt={`Image ${index}`} style={{ width: '100%', height: '100%' }} />
                            </Paper>
                        ))}

                    </Carousel>
                </Box>

                <Item sx={{ marginTop: '1rem' }}>


                    <Grid container alignItems="center" sx={{ paddingLeft: '10px', paddingRight: '10px', fontSize: '30px' }}>
                        {data.a_acc_name}
                        <Grid item xs={10} sx={{ mt: '10px' }}>
                            <Divider variant="left" sx={{ width: '100%' }} />
                        </Grid>
                    </Grid>

                </Item>

                <Item sx={{ marginTop: '1rem' }}>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        주소 : {data.a_acc_address}
                    </Grid>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        연락처 : {data.a_acc_phone}
                    </Grid>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        이메일 : {data.a_m_email}
                    </Grid>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        사업자 번호 : {data.a_acc_bn}
                    </Grid>
                    <Grid container xs={10} sx={{ alignSelf: 'flex-start', fontSize: '15px', marginTop: '8px', paddingLeft: '10px', paddingRight: '10px' }}>
                        대표자 명 : {data.a_m_name}
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
                        <span dangerouslySetInnerHTML={{ __html: data.a_acc_intro }}></span>
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
                    <Grid container spacing={2}>
                        {rooms.map((room, index) => (
                            <Grid item key={index} xs={12}>
                                <Card>
                                    <CardContent>
                                        <h2>방 이름: {room.roomName}</h2>
                                        {/* 다른 방 정보 표시 */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleRoomDetails(room.id)}
                                        >
                                            방 상세 보기
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        {isAddingRoom && (
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        {/* 방 등록 양식 입력 */}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSaveRoom}
                                        >
                                            저장
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {isAddingRoom ? (
                            <IconButton aria-label="방 등록" onClick={handleSaveRoom}>
                                <AddIcon />
                            </IconButton>
                        ) : (
                            <IconButton aria-label="방 추가" onClick={handleAddRoom}>
                                <AddIcon />
                            </IconButton>
                        )}
                    </Grid>
                </Item>

            </Paper>
        </Container>


    );


}

export default AdminDetailAccm;