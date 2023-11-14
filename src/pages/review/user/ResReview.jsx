import { useEffect, useState, useRef } from "react";
import KakaoMapForAccm from "../../../components/KaokaoMapForAccm";
import api from "../../../hooks/RefreshTokenAuto";
import markerImage from '../../../imgs/markerImage.png'
import "../../../css/InfoWindow.css";
import { Box } from "@mui/system";
import { Button, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';




const ResReview = () => {



    // const [longitude, setLongitude] = useState("");
    // const [latitude, setLatitude] = useState("");

    const [accAddress, setAccAddress] = useState("");
    const [convertedAddress, setConvertedAddress] = useState("");
    const [inputAndMarker, setInputAndMarker] = useState({});

    let markerIdCounter = 0; // 전역 카운터 또는 다른 방법으로 고유 식별자 생성


    // 마커에 따라 TExtField 생성
    const [markerInfo, setMarkerInfo] = useState([]);

    const [a_r_content, setA_r_content] = useState(''); // 방 리뷰 설명
    const [r_ri_image, setR_ri_image] = useState([]);

    const accmNum = {
        a_acc_no: 7
    }

    const [backEndData, setBackEndData] = useState({
        accmData: {}
    });




    const fetchData = async () => {


        try {
            const res = await api.post(`/api/user/accm/showAccmDetail?a_acc_no=${accmNum?.a_acc_no}`);
            //  res -> 서버에서 받아온 데이터
            console.log("detail data success");
            // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.

            setBackEndData({
                accmData: res.data.adminAccmDto,
                // accmImages: res.data.a_i_images
            });

            setAccAddress(res.data.adminAccmDto?.a_acc_address);
            // setLatitude(res.data.adminAccmDto.a_acc_address);

        } catch (error) {

            console.error("An error occurred:", error);
        }
    }

    useEffect(() => {
        fetchData(); // 비동기 함수 호출
    }, []);

    console.log("accAddress", accAddress);




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
            additionalInfo: '' // 사용자 입력을 위한 추가 정보
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
                // let address = result[0].address.address_name;
                // setConvertedAddress(result[0].address.address_name);
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

            // 주소로 좌표를 검색합니다
            geocoder.addressSearch(address, function (result, status) {
                // 정상적으로 검색이 완료됐으면 
                if (status === window.kakao.maps.services.Status.OK) {
                    let coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                    displayMarker(coords);
                }
            });
            // let markerPosition = new window.kakao.maps.LatLng(geocodeAddress(accAddress)); // latitude 위도, longitude 경도

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

        // 이미지 에러 글을 지우기 위해 상태변화를 false를 준다.
        // if (e.target.files.length >= 0) {
        //     setImageError(false);
        // }
        // 이미지 에러 글을 지우기 위해 상태변화를 false를 준다.
    };


    const handleRemoveImage = (keyToRemove) => {
        // 선택된 이미지를 제거합니다.
        const indexToRemove = selectedFileNames.findIndex(fileName => fileName.key === keyToRemove);

        setR_ri_image(prevImages => prevImages.filter((_, index) => index !== indexToRemove));

        // 선택된 파일 이름 목록에서 해당 항목을 제거합니다.
        const updatedFileNames = selectedFileNames.filter(fileName => fileName.key !== keyToRemove);
        setSelectedFileNames(updatedFileNames);

        // 선택된 파일 URL 목록에서 해당 항목을 제거합니다.
        const updatedFileURLs = selectedFileURLs.filter((_, index) => index !== indexToRemove);
        setSelectedFileURLs(updatedFileURLs);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'a_r_content':
                setA_r_content(value);
                break;
            // 이미지 핸들링은 별도로 처리해야 합니다.
            default:
                break;
        }
        // 에러 필드를 나타내기 위한 코드 //
        // if (value === '') {
        //     setFieldErrors({
        //         ...fieldErrors,
        //         [name]: true
        //     });
        // } else {
        //     setFieldErrors({
        //         ...fieldErrors,
        //         [name]: false
        //     });
        // }
        // 에러 필드를 나타내기 위한 코드 //

    };



    const registReview = async () => {

        // console.log("markerInfo.address", markerInfo.address);

        try {
            const response = await api.post('/api/user/review/registConfirm', {
                markerData: markerInfo
            });
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

            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                리뷰 등록
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>


                <div id="map" style={{
                    width: "800px",
                    height: "400px",
                    borderRadius: '10px', // 모서리 둥글게
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' // 그림자 효과 (선택적)
                }}></div>

            </div>
            {markerInfo.length === 0 ? (
                // markerInfo 배열이 비어있을 때 표시할 메시지
                <Typography sx={{ mt: 2, mb: 2 }}>
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
                            value={info.additionalInfo}
                            onChange={(e) => updateMarkerInfo(index, { additionalInfo: e.target.value })}
                        />
                    </Box>
                ))
            )}


            <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadProfile} multiple="multiple" style={{ display: 'none' }} id="fileInput" />
            <label htmlFor="fileInput">
                <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                    이미지 업로드
                </Button>
            </label>
            {/* <p style={{ color: imageError ? 'red' : 'transparent' }} ref={errorMessageRef}>
                {imageError ? "이미지를 업로드해주세요." : ""}
            </p> */}
            <List>
                {selectedFileNames.map((fileName, index) => (
                    <ListItem key={fileName.key}>
                        <ListItemText primary={fileName.props.children.props.primary} />
                        <img src={selectedFileURLs[index]} alt={fileName.props.children.props.primary} style={{ width: '50px', height: '50px', marginLeft: '10px' }} /> {/* 이미지 미리보기 추가 */}
                        <Button onClick={() => handleRemoveImage(fileName.key)} style={{ marginLeft: '10px' }}>X</Button>
                    </ListItem>
                ))}
            </List>


            <TextField
                variant="outlined"
                name="a_r_content"
                margin="normal"
                required
                fullWidth
                id="outlined-multiline-static"
                label="리뷰 적기"
                multiline
                value={a_r_content}
                onChange={handleChange}
                rows={5} // 기본적으로 보여줄 행의 수
            />



            <Button variant="contained" color="primary" onClick={registReview}>
                제출하기
            </Button>
        </Paper>

    );
}

export default ResReview;