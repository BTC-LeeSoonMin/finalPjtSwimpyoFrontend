import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import Carousel from 'react-material-ui-carousel'
import api from "../../../../hooks/RefreshTokenAuto";

const UserRoomList = ({ accomNum, requestData, accmName }) => {


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
    console.log("requestData", requestData);
    console.log("accmName", accmName);


    console.log("backEndData.roomData.a_r_no", backEndData.roomData.map((item) => item.a_r_no));
    console.log("backEndData.roomData.a_acc_no", backEndData.roomData.map((item) => item.a_acc_no));


    const handleMoveToDetailRoom = (roomNum) => {
        navigate(`/user/accommodation/detailRoom/${backEndData.roomData.map((item) => item.a_acc_no)}/${roomNum}`, { state: accmName });
    }



    const fetchData = async () => {
        try {
            const res = await api.post(`http://localhost:8090/api/user/room/showRoomList?a_acc_no=${accomNum.a_acc_no}`);
            //  res -> 서버에서 받아온 데이터
            console.log("room data success");
            // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.

            setBackEndData({
                roomData: res.data.userRoomDtos,
                roomImages: res.data.r_i_images,
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        }}>
            <Grid container spacing={0} >
                {backEndData.roomData.map((room) => {
                    // 해당 객실에 대응하는 이미지 객체를 찾음
                    const imageObj = backEndData.roomImages.find((image, index) => image.a_r_no === room.a_r_no);
                    // 이미지 객체가 존재하지 않는 경우 기본 이미지 경로를 사용한다.
                    const imageUrl = imageObj ? imageObj.r_i_image : 'defaultImagePath'; // 'defaultImagePath'를 기본 이미지 경로로 교체해야함
                    return (
                        // const imageNum = imageObj.r_i_no;
                        <Grid item xs={12} sm={6} key={room.a_r_no} sx={{
                            display: 'flex', justifyContent: 'center', border: 1,
                            borderColor: 'grey.500',
                            borderRadius: 'borderRadius',
                        }}>
                            <Box sx={{
                                maxWidth: 400,
                                width: '100%',
                                m: 3
                            }}>
                                <Card sx={{ maxWidth: 400, elevation: 3 }}>
                                    <Carousel sx={{ zIndex: 0 }}>
                                        <CardMedia
                                            component="img"
                                            height="300"
                                            image={imageUrl} // imageUrl을 src 속성에 사용

                                        />
                                    </Carousel>

                                    <CardContent
                                        sx={{
                                            paddingBottom: '10px',
                                            '&:last-child': {
                                                paddingBottom: '16px',
                                            },
                                        }}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            align="left"
                                            sx={{
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {room.a_r_name}
                                        </Typography>
                                        <Typography variant="body2" align="right" sx={{ marginBottom: '0.5rem' }}>
                                            ({room.a_r_state}) ({room.a_r_check_in} ~ )
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" align="right"
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '1.1rem'
                                            }}
                                        >
                                            가격: {room.a_r_price.toLocaleString('ko-KR')}원
                                        </Typography>
                                    </CardContent>

                                    <Grid container sx={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Button
                                            type="button"
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                mt: 3, mb: 2, mr: 2, width: 'auto', backgroundColor: "black",
                                                borderColor: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                                },
                                            }}

                                            onClick={() => handleMoveToDetailRoom(room.a_r_no)}
                                        >
                                            객실 상세보기
                                        </Button>
                                    </Grid>

                                </Card>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}

export default UserRoomList;