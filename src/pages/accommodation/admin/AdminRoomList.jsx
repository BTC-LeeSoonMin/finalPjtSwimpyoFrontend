import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from "react-router";
import ConfirmOrClose from "../../../components/ConfirmOrClose";
import axios from "axios";
import { Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'

const AdminRoomList = ({ accomNum, requestData }) => {

    // 모달창 열기 //
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);

    // 백엔드에서 온 데이터
    const [backEndData, setBackEndData] = useState({
        roomData: [],
        roomImages: [],
        roomImageNos: []
    });
    // 백엔드에서 온 데이터

    const [dataLoaded, setDataLoaded] = useState(false);

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log("accomNum", accomNum.a_acc_no);
    console.log("accomNum.a_m_no", accomNum.a_m_no);

    const handleRegistConfirmation = () => {
        navigate(`/admin/accommodation/registRoom/${accomNum.a_acc_no}`);
    }


    const handleAdd = () => {
        if (name) {
            setItems(prevItems => [...prevItems, name]);
            setName('');
            setOpen(false);
        }
    };

    console.log("backEndData.roomData.a_r_no", backEndData.roomData.map((item) => item.a_r_no));

    const handleMoveToDetailRoom = (roomNum) => {
        navigate(`/admin/accommodation/detailRoom/${roomNum}`);
    }



    const fetchData = async () => {
        try {
            const res = await axios.post(`http://localhost:8090/api/admin/room/showRoomList?a_acc_no=${accomNum.a_acc_no}`);
            //  res -> 서버에서 받아온 데이터
            console.log("room data success");
            // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.

            setBackEndData({
                roomData: res.data.adminRoomDtos,
                roomImages: res.data.roomImageDtos,
            });

        } catch (error) {
            // setDataLoaded(true);
            console.error("에러 발생", error);
        }
    };


    useEffect(() => {
        fetchData(); // 비동기 함수 호출
    }, [accomNum]);

    console.log("backEndData.roomData", backEndData.roomData);
    console.log("backEndData.roomImages", backEndData.roomImages);

    return (
        <div>
            <Grid container spacing={2}>
                {backEndData.roomData.map((room) => {
                    // 해당 객실에 대응하는 이미지 객체를 찾습니다.
                    const imageObj = backEndData.roomImages.find((image, index) => image.a_r_no === room.a_r_no);
                    // 이미지 객체가 존재하지 않는 경우 기본 이미지 경로를 사용합니다.
                    const imageUrl = imageObj ? imageObj.r_i_image : 'defaultImagePath'; // 'defaultImagePath'를 기본 이미지 경로로 교체하세요.
                    // const imageNum = imageObj.r_i_no;

                    return (
                        <Grid item xs={12} sm={6} key={room.a_r_no}>
                            <Card style={{ minHeight: '400px' }}>
                                <Carousel>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={imageUrl} // imageUrl을 src 속성에 사용합니다.
                                    // alt={imageNum}
                                    />
                                </Carousel>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {room.a_r_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        가격: {room.a_r_price.toLocaleString('ko-KR')}원
                                    </Typography>
                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 3, mb: 2, mr: 2 }}
                                        onClick={() => handleMoveToDetailRoom(room.a_r_no)}
                                    >
                                        객실 상세보기
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
                {backEndData.roomData.length === 0 || backEndData.roomData.length % 2 !== 0 ? (
                    <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{
                            minWidth: 140, // Set both minWidth and height to ensure a square
                            height: 140,   // You can adjust the size (140 here) as needed
                            maxWidth: '100%', // Ensure that button is not bigger than its container
                            maxHeight: '100%',
                            fontSize: '3rem' // Adjust font size if needed
                        }}>
                            +
                        </Button>
                    </Grid>
                ) : null}

                {backEndData.roomData.length > 0 && backEndData.roomData.length % 2 === 0 ? (
                    <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{
                            minWidth: 140, // Set both minWidth and height to ensure a square
                            height: 140,   // You can adjust the size (140 here) as needed
                            maxWidth: '100%', // Ensure that button is not bigger than its container
                            maxHeight: '100%',
                            fontSize: '3rem' // Adjust font size if needed
                        }}>
                            +
                        </Button>
                    </Grid>
                ) : null}
            </Grid>
            <ConfirmOrClose open={open} close={handleClose} confirmation={handleRegistConfirmation} words="등록" />
        </div>
    );

}



export default AdminRoomList;
