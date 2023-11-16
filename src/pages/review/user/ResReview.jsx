import { useEffect, useState, useRef } from "react";
import KakaoMapForAccm from "../../../components/KaokaoMapForAccm";
import api from "../../../hooks/RefreshTokenAuto";
import markerImage from '../../../imgs/markerImage.png'
import { Box } from "@mui/system";
import { Button, Divider, IconButton, List, ListItem, ListItemText, Paper, Rating, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate, useParams } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const ResReview = () => {


    // location으로 예약번호, 이메일, 숙박업소 번호, 방 번호
    const params = useParams();
    const navigate = useNavigate();

    console.log("params", params);

    const u_m_email = params.u_m_email;
    const a_acc_no = params.a_acc_no;
    const a_r_no = params.a_r_no;
    const u_r_no = params.u_r_no;

    const [accAddress, setAccAddress] = useState("");
    const [convertedAddress, setConvertedAddress] = useState("");
    const [inputAndMarker, setInputAndMarker] = useState({});

    let markerIdCounter = 0; // 전역 카운터 또는 다른 방법으로 고유 식별자 생성


    // 마커에 따라 TExtField 생성
    const [markerInfo, setMarkerInfo] = useState([]);

    const [r_xy_address, setR_xy_address] = useState("");
    const [r_xy_comment, setR_xy_comment] = useState("");

    const [r_content, setR_content] = useState(''); // 방 리뷰 설명
    const [r_ri_image, setR_ri_image] = useState([]);

    // 별점
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event, newValue) => {
        setRating(newValue); // 사용자가 선택한 평점으로 상태 업데이트

    };
    console.log("value", rating);
    // 별점

    const handleBack = () => {
        navigate(`/user/myPage`);
    }

    const [backEndData, setBackEndData] = useState({
        accmData: {}
    });




    const fetchData = async () => {


        try {
            const res = await api.post(`/api/user/accm/showAccmDetail?a_acc_no=${a_acc_no}`);
            //  res -> 서버에서 받아온 데이터
            console.log("detail data success");

            setBackEndData({
                accmData: res.data.adminAccmDto,

            });

            setAccAddress(res.data.adminAccmDto?.a_acc_address);


        } catch (error) {

            console.error("An error occurred:", error);
        }
    }

    useEffect(() => {
        fetchData(); // 비동기 함수 호출
    }, []);

    console.log("accAddress", accAddress);
    console.log("backEndData", backEndData);
    console.log("왜 안나오지");



    const displayMarker = (coords) => {
        let container = document.getElementById('map');
        let options = {
            center: coords,
            level: 3
        };
        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        // 마커 이미지 위한 것
        let imageSrc = markerImage;
        let imageSize = new window.kakao.maps.Size(50, 50);
        let imageOption = { offset: new window.kakao.maps.Point(27, 50) };
        let markerComplete = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
        // 마커 이미지 위한 것

        let marker = new window.kakao.maps.Marker({
            position: coords,
            image: markerComplete
        });
        marker.setMap(map);
        map?.setCenter(coords);

        window.kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            let latlng = mouseEvent.latLng;
            createMarker(latlng, map);
        });

    };


    // 마커 찍는 것
    const createMarker = (latlng, map) => {
        let marker = new window.kakao.maps.Marker({
            position: latlng
        });
        marker.setMap(map);


        const markerId = ++markerIdCounter; // 마커에 고유 식별자 할당
        // 새로운 마커 정보 추가
        setMarkerInfo(prev => [...prev, {
            id: markerId,
            latlng: latlng,
            address: '', // 초기 주소는 비어 있거나, geocoder를 사용하여 설정할 수 있음
            r_xy_comment: '' // 사용자 입력을 위한 추가 정보
        }]);
        // 주소를 가져와서 업데이트
        getAddressFromCoords(latlng, markerId);

        // 마커 삭제
        window.kakao.maps.event.addListener(marker, 'click', function () {
            marker.setMap(null);

            deleteMarker(markerId);
        });


    };

    const updateMarkerInfo = (index, newInfo) => {
        setMarkerInfo(prev => prev.map((info, i) => i === index ? { ...info, ...newInfo } : info));
    };

    const deleteMarker = (markerId) => {

        // 마커 정보 배열에서 해당 마커 정보 제거
        setMarkerInfo(prev => prev.filter(info => info.id !== markerId));
    };

    const getAddressFromCoords = (coords, markerId) => {
        let geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(coords.getLng(), coords.getLat(), function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {

                let address = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                updateMarkerInfoWithAddress(markerId, address);
            }
        });
    };

    const updateMarkerInfoWithAddress = (markerId, address) => {
        setMarkerInfo(prev => prev.map(info => info.id === markerId ? { ...info, address } : info));
    };

    console.log("convertedAddress", convertedAddress);

    useEffect(() => {

        // 함수 내에서 좌표를 검색 후 해당좌표에 마커를 만들고 지도 표시
        const geocodeAddress = (address) => {
            // 카카오맵 Geocoder 객체 생성
            let geocoder = new window.kakao.maps.services.Geocoder();

            // 주소로 좌표를 검색
            geocoder.addressSearch(address, function (result, status) {

                if (status === window.kakao.maps.services.Status.OK) {
                    let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    displayMarker(coords);
                }
            });


        };

        if (accAddress) {
            geocodeAddress(accAddress);
        }
    }, [accAddress]);

    useEffect(() => {
        console.log("inputAndMarker", inputAndMarker);

    }, [inputAndMarker]);



    // 이미지 등록 시작
    // 파일 업로드를 위한 상태
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [selectedFileURLs, setSelectedFileURLs] = useState([]); // 이미지 URL을 저장할 상태 추가
    const fileInputRef = useRef(null);
    const errorMessageRef = useRef(null);
    // 파일 업로드를 위한 상태

    const uploadProfile = (e) => {
        const files = Array.from(e.target.files);
        setR_ri_image(prevImages => [...prevImages, ...files]);
        // 선택된 파일의 이름들을 보여주는 코드 추가
        const fileNames = files.map(file => (
            <ListItem key={file.name + Date.now()}>
                <ListItemText primary={file.name} />
            </ListItem>
        ));
        setSelectedFileNames(prevFileNames => [...prevFileNames, ...fileNames]); // React의 state를 사용하여 파일 이름을 저장

        const fileURLs = files.map(file => URL.createObjectURL(file)); // 이미지 URL 생성
        setSelectedFileURLs(prevURLs => [...prevURLs, ...fileURLs]); // 이미지 URL 상태에 저장

        e.target.value = null;

    };


    const handleRemoveImage = (keyToRemove) => {
        // 선택된 이미지를 제거
        const indexToRemove = selectedFileNames.findIndex(fileName => fileName.key === keyToRemove);

        setR_ri_image(prevImages => prevImages.filter((_, index) => index !== indexToRemove));

        // 선택된 파일 이름 목록에서 해당 항목을 제거
        const updatedFileNames = selectedFileNames.filter(fileName => fileName.key !== keyToRemove);
        setSelectedFileNames(updatedFileNames);

        // 선택된 파일 URL 목록에서 해당 항목을 제거
        const updatedFileURLs = selectedFileURLs.filter((_, index) => index !== indexToRemove);
        setSelectedFileURLs(updatedFileURLs);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'r_content':
                setR_content(value);
                break;
            // 이미지 핸들링은 별도로 처리해야 합니다.
            default:
                break;
        }
    };


    const registReview = async (e) => {
        e.preventDefault(e);
        // console.log("markerInfo.address", markerInfo.address);
        const data = new FormData();


        for (let i = 0; i < r_ri_image.length; i++) {
            data.append('reviewImages', r_ri_image[i]);
            console.log("r_ri_image", r_ri_image[i]);
        }


        const jsonBlobRes = new Blob([JSON.stringify({
            a_r_no: a_r_no,
            a_acc_no: a_acc_no,
            u_m_email: u_m_email,
            u_r_no: u_r_no,
        })], { type: "application/json" });
        data.append("userReservationDto", jsonBlobRes);

        const jsonBlobReview = new Blob([JSON.stringify({
            a_r_no: a_r_no,
            a_acc_no: a_acc_no,
            u_m_email: u_m_email,
            r_content: r_content,
            r_sa_point: rating
        })], { type: "application/json" });
        data.append("userReviewDto", jsonBlobReview);


        // markerInfo 배열에서 각 객체의 'address'를 'r_xy_address'로 변경
        const modifiedMarkerInfo = markerInfo.map(item => ({
            ...item,
            r_xy_address: item.address, // 'address'를 'r_xy_address'로 변경
            u_m_email: u_m_email,
            a_r_no: a_r_no

        }));

        console.log("modifiedMarkerInfo", modifiedMarkerInfo);

        // modifiedMarkerInfo 배열을 JSON 문자열로 변환
        const markerInfoJson = JSON.stringify(modifiedMarkerInfo);

        // JSON 문자열을 Blob 객체로 변환
        const markerInfoBlob = new Blob([markerInfoJson], { type: "application/json" });

        // Blob 객체를 FormData에 추가
        data.append('address', markerInfoBlob);


        for (let [key, value] of data.entries()) {
            console.log("데이터 확인", key, value);
        }

        console.log("data", data);
        console.log("data", data);

        try {
            console.log("들어가지나");
            const response = await api.post('/api/user/review/registConfirm',
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data == "success") {
                alert("리뷰등록이 완료 되었습니다");
                navigate(`/user/myPage`);
            } else if (response.data == "fail") {
                alert("리뷰등록에 실패하였습니다");
            }

            console.log('Data sent to backend:', response.data);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

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
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                <IconButton aria-label="뒤로 가기" onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>
            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                리뷰 등록
            </Typography>

            <form onSubmit={registReview} name='regist_review_confirm' style={{ width: '100%', marginTop: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>


                    <div id="map" style={{
                        width: "800px",
                        height: "400px",
                        borderRadius: '10px', // 모서리 둥글게
                        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' // 그림자 효과 (선택적)
                    }}></div>

                </div>

                <Divider sx={{ my: 2 }} />
                {markerInfo.length === 0 ? (
                    // markerInfo 배열이 비어있을 때 표시할 메시지
                    <Typography sx={{ mt: 2, mb: 2, color: 'green' }}>
                        마커를 찍어 여행갔던 장소를 등록해주세요.
                    </Typography>
                ) : (

                    markerInfo.map((info, index) => (
                        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2, mb: 2 }}>
                            <Box sx={{ mb: 1, width: '300px' }}>
                                <span style={{ fontSize: '13px' }}> <span style={{ fontWeight: 'Bold' }}>주소: </span> {info.address || '주소를 설정하세요'}</span>
                            </Box>
                            <TextField
                                label="장소 이름"
                                variant="outlined"
                                fullWidth
                                value={info.r_xy_comment}
                                onChange={(e) => updateMarkerInfo(index, { r_xy_comment: e.target.value })}
                            />
                        </Box>
                    ))
                )}
                <Divider sx={{ my: 2 }} />

                <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadProfile} multiple="multiple" style={{ display: 'none' }} id="fileInput" />
                <label htmlFor="fileInput">
                    <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                        이미지 업로드
                    </Button>
                </label>

                <List>
                    {selectedFileNames.map((fileName, index) => (
                        <ListItem key={fileName.key}>
                            <ListItemText primary={fileName.props.children.props.primary} />
                            <img src={selectedFileURLs[index]} alt={fileName.props.children.props.primary} style={{ width: '50px', height: '50px', marginLeft: '10px' }} /> {/* 이미지 미리보기 추가 */}
                            <Button onClick={() => handleRemoveImage(fileName.key)} style={{ marginLeft: '10px' }}>X</Button>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ my: 2 }} />
                <Rating
                    name="user-rating"
                    value={rating}
                    onChange={handleRatingChange} // 평점 변경 핸들러
                    size="medium"
                />
                <Typography component="legend">숙박업소는 어떠셨나요?</Typography>

                <TextField
                    variant="outlined"
                    name="r_content"
                    margin="normal"
                    required
                    fullWidth
                    id="outlined-multiline-static"
                    label="리뷰 적기"
                    multiline
                    value={r_content}
                    onChange={handleChange}
                    rows={5} // 기본적으로 보여줄 행의 수
                />


                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2, mr: 2 }}
                >
                    등록
                </Button>
            </form>
        </Paper >

    );
}

export default ResReview;