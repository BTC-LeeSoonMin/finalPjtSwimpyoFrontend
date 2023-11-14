
import { useEffect, useState } from "react";
import KakaoMapForAccm from "../../../components/KaokaoMapForAccm";
import api from "../../../hooks/RefreshTokenAuto";
import markerImage from '../../../imgs/markerImage.png'

const ResReview = () => {


    // const [longitude, setLongitude] = useState("");
    // const [latitude, setLatitude] = useState("");

    const [accAddress, setAccAddress] = useState("");

    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchResults, setSearchResults] = useState([]);


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




    useEffect(() => {

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
            // 마커 삭제
            window.kakao.maps.event.addListener(marker, 'click', function () {
                marker.setMap(null);
            });

            getAddressFromCoords(latlng);
        };

        const getAddressFromCoords = (coords) => {
            let geocoder = new window.kakao.maps.services.Geocoder();

            geocoder.coord2Address(coords.getLng(), coords.getLat(), function (result, status) {
                if (status === window.kakao.maps.services.Status.OK) {
                    let address = result[0].address.address_name;
                }
            });
        };


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




    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {/* <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>

            <ul>
                {searchResults.map((place, index) => (
                    <li key={index} onClick={() => selectPlace(place)}>
                        {place.place_name}
                    </li>
                ))}
            </ul> */}

            <div id="map" style={{
                width: "800px",
                height: "400px",
                borderRadius: '10px', // 모서리 둥글게
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' // 그림자 효과 (선택적)
            }}></div>
        </div>

    );
}

export default ResReview;