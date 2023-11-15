import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../hooks/RefreshTokenAuto";
import temp1 from '../../../assets/temp.jpg';
import temp2 from '../../../assets/temp2.jpg';
import markerImage from '../../../imgs/markerImage.png'
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmOrClose from "../../../components/ConfirmOrClose";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const imgSlide = {
    display: 'flex',
    width: '100%',
    overflowX: 'auto', // 이미지가 넘칠 때 가로 스크롤바 표시
    flexWrap: 'nowrap', // 이미지들이 가로로 한 줄에 나열되도록 설정
    mt: '8px',
};

const imgStyle = {
    flex: '0 0 auto', // 이미지들이 크기를 유지하도록 설정
    width: '200px', // 각 이미지의 너비 설정
    height: '125px', // 각 이미지의 높이 설정
    marginRight: '10px', // 이미지 간 간격 설정
};


const DetailReview = () => {

    const token = useSelector((store) => store.accessToken.value);
    console.log('토큰 값', token);
    const params = useParams();
    const navigate = useNavigate();

    const [openDelete, setOpenDelete] = useState(false);

    const [userMemberEmail, setUserMemberEmail] = useState("");
    const [reviewInfoFromBackEnd, setReviewInfoFromBackEnd] = useState({
        reviewDto: {},
        r_ri_images: [],
        r_xy_address: []
    });


    const handleClickOpen = (type) => {
        // 수정과 삭제 버튼 클릭 시 실행
        if (type === 'delete') {
            setOpenDelete(true); // 삭제 버튼 클릭 시 삭제 모달을 열도록
        }
    }

    const close = (type) => {
        if (type === 'delete') {
            setOpenDelete(false);
        }
    };

    const handleDeleteConfirmation = () => {
        // 삭제 버튼 클릭 시
    }

    const handleBack = () => {
        navigate(``);
    }

    const userInfoEmail = async () => {
        if (token) {
            try {
                const res = await api.post(`/api/user/member/userInfo`);

                console.log(res.data);
                setUserMemberEmail(res.data.u_m_email);

            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    }

    const reviewInfo = async () => {
        try {
            const res = await api.get("/api/user/review/showDetail", { params: { "r_no": 123 } },)
            console.log(res.data);
            setReviewInfoFromBackEnd({
                reviewDto: res.data.reviewDto,
                r_ri_images: res.data.r_ri_images,
                r_xy_address: res.data.r_xy_address
            });

        } catch (error) {
            console.error("An error occurred:", error);
        }
    }


    useEffect(() => {
        userInfoEmail();
        reviewInfo();
    }, [params]);

    console.log("userMemberEmail", userMemberEmail);
    console.log("reviewInfoFromBackEnd", reviewInfoFromBackEnd);


    // useEffect(() => {
    //     fetchData(); // 비동기 함수 호출
    // }, []);

    useEffect(() => {

        let container = document.getElementById('map');
        let options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴


        // let imageSrc = markerImage;
        // let imageSize = new window.kakao.maps.Size(50, 50);
        // let imageOption = { offset: new window.kakao.maps.Point(27, 50) };
        // let markerComplete = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


        // let markerPosition = new window.kakao.maps.LatLng(latitude, longitude); // latitude 위도, longitude 경도
        // let marker = new window.kakao.maps.Marker({
        //     position: markerPosition,
        //     image: markerComplete
        // });

        // marker.setMap(map);
        // map.setCenter(markerPosition);
        reviewInfoFromBackEnd.r_xy_address.forEach(addressObj => {
            new window.kakao.maps.services.Geocoder().addressSearch(addressObj.r_xy_address, function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `<div style="padding:5px;">${addressObj.r_xy_comment}</div>` // 정보 창에 표시될 내용
                    });

                    infowindow.open(map, marker);
                    map.setCenter(coords);
                }
            });
        });
    }, [reviewInfoFromBackEnd])




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
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <IconButton aria-label="뒤로 가기" onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
                <IconButton aria-label="삭제" onClick={() => handleClickOpen('delete')}>
                    <DeleteIcon />
                </IconButton>
                <ConfirmOrClose open={openDelete} close={() => close('delete')} confirmation={handleDeleteConfirmation} words="삭제" />
            </Box>
            <Box sx={{ display: 'flex', width: '100%', mt: '1rem' }}>
                <Typography
                    noWrap
                    component="div"
                    sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: 'black',
                        display: 'flex',
                        justifyContent: 'flex-first',
                        width: '100%',
                        mb: '1rem',
                    }}
                >{reviewInfoFromBackEnd.reviewDto.a_acc_name}</Typography>

            </Box>
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
                >{reviewInfoFromBackEnd.reviewDto.u_m_nickname}</Typography>
                <Typography
                    noWrap
                    component="div"
                    sx={{
                        color: '#C8C8C8',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%'
                    }}
                >{reviewInfoFromBackEnd.reviewDto.r_reg_date}</Typography>
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
            >{reviewInfoFromBackEnd.reviewDto.a_r_name}</Typography>

            <div>
                <div id="map" style={{ width: "700px", height: "400px" }}></div>
            </div>


            <Typography
                component="div"
                sx={{
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'flex-first',
                    width: '100%',
                    mt: '2rem',
                    mb: '1rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}
            >{reviewInfoFromBackEnd.reviewDto.r_content}</Typography>

            <Box sx={{ ...imgSlide }}>
                {reviewInfoFromBackEnd.r_ri_images.map((image, index) => (
                    <img key={index} src={image.r_ri_image} style={imgStyle} />
                ))}
            </Box>
            {/* </Box> */}
        </Paper>

    );

}

export default DetailReview;