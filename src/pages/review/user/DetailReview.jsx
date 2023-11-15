import { Box, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../hooks/RefreshTokenAuto";
import temp1 from '../../../assets/temp.jpg';
import temp2 from '../../../assets/temp2.jpg';
import markerImage from '../../../imgs/markerImage.png'


const textHidden = {
    width: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
};

const imgSlide = {
    display: 'flex',
    width: '100%',
    overflowX: 'auto', // 이미지가 넘칠 때 가로 스크롤바 표시
    flexWrap: 'nowrap', // 이미지들이 가로로 한 줄에 나열되도록 설정
    mt: '8px',
};

const img = {
    flex: '0 0 auto', // 이미지들이 크기를 유지하도록 설정
    width: '200px', // 각 이미지의 너비 설정
    height: '125px', // 각 이미지의 높이 설정
    marginRight: '10px', // 이미지 간 간격 설정
};


const DetailReview = () => {


    const [hidden, setHidden] = useState(true);

    console.log('hidden', hidden);

    const moreClick = (e) => {
        e.preventDefault();
        setHidden(false);
    };


    // const fetchData = async () => {

    //     try {
    //         const res = await api.post(`/api/user/accm/showAccmDetail?a_acc_no=${accmNum?.a_acc_no}`);
    //         //  res -> 서버에서 받아온 데이터
    //         console.log("detail data success");
    //         // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.

    //         setBackEndData({
    //             accmData: res.data.adminAccmDto,
    //             // accmImages: res.data.a_i_images
    //         });

    //         setAccAddress(res.data.adminAccmDto?.a_acc_address);
    //         // setLatitude(res.data.adminAccmDto.a_acc_address);

    //     } catch (error) {

    //         console.error("An error occurred:", error);
    //     }
    // }

    // useEffect(() => {
    //     fetchData(); // 비동기 함수 호출
    // }, []);

    // useEffect(() => {

    //     let container = document.getElementById('map');
    //     let options = { //지도를 생성할 때 필요한 기본 옵션
    //         center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
    //         level: 3 //지도의 레벨(확대, 축소 정도)
    //     };

    //     let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


    //     let imageSrc = markerImage;
    //     let imageSize = new window.kakao.maps.Size(50, 50);
    //     let imageOption = { offset: new window.kakao.maps.Point(27, 50) };
    //     // let markerComplete = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


    //     // let markerPosition = new window.kakao.maps.LatLng(latitude, longitude); // latitude 위도, longitude 경도
    //     let marker = new window.kakao.maps.Marker({
    //         // position: markerPosition,
    //         image: markerComplete
    //     });

    //     marker.setMap(map);
    //     map.setCenter(markerPosition);
    // }, [])




    return (

        <Paper elevation={3} sx={{
            width: '800px',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto', // This centers the Paper component
            marginTop: 3,
        }}>
            {/* <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: '1rem',
            }}> */}
            <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                {/* <Link to={`/user/accommodation/reviewDetail/${a_r_no}`} >상세보기</Link> */}
                {/* <Link to='/user/accommodation/reviewDetail/' style={{ textDecoration: 'none', color: 'black' }}>상세보기 &gt;</Link> */}
            </Typography>
            <Box sx={{ display: 'flex', width: '100%' }}>
                <Typography
                    noWrap
                    component="div"
                    sx={{
                        color: '#C8C8C8',
                        display: 'flex',
                        justifyContent: 'flex-first',
                        width: '100%'
                    }}
                >진범냐</Typography>
                <Typography
                    noWrap
                    component="div"
                    sx={{
                        color: '#C8C8C8',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}
                >2023-11-14</Typography>
            </Box>
            <Typography
                noWrap
                component="div"
                sx={{
                    fontWeight: 'bold',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'flex-first',
                    width: '100%',
                    mb: '1rem',
                }}
            >디럭스</Typography>
            {/* 
            <div>
                <div id="map" style={{ width: "800px", height: "400px" }}></div>
            </div> */}

            {hidden &&
                <Typography
                    noWrap
                    component="div"
                    sx={{ ...textHidden }}
                >리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용리뷰내용</Typography>
            }
            {/* <Typography sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}> */}
            {/* {hidden && <Link onClick={(e) => moreClick(e)} style={{ color: 'black' }}>더보기</Link>}</Typography> */}
            {!hidden &&
                <Typography
                    component="div"
                    sx={{
                        width: '100%'
                    }}
                >더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기더보기</Typography>}
            <Box sx={{ ...imgSlide }}>
                <img src={temp1} style={img} />
                <img src={temp2} style={img} />
                <img src={temp1} style={img} />
                <img src={temp2} style={img} />
            </Box>
            <Divider sx={{ width: '100%', mt: '1rem' }} />
            {/* </Box> */}
        </Paper>

    );

}

export default DetailReview;