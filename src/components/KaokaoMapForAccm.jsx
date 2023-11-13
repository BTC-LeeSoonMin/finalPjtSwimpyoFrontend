import React, { useEffect } from "react";
import markerImage from '../imgs/markerImage.png'

const KakaoMapForAccm = ({ longitude, latitude }) => {


    useEffect(() => {

        let container = document.getElementById('map');
        let options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴



        let imageSrc = markerImage;
        let imageSize = new window.kakao.maps.Size(50, 50);
        let imageOption = { offset: new window.kakao.maps.Point(27, 50) };
        let markerComplete = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


        let markerPosition = new window.kakao.maps.LatLng(latitude, longitude); // latitude 위도, longitude 경도
        let marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerComplete
        });

        marker.setMap(map);
        map.setCenter(markerPosition);
    }, [longitude, latitude])


    return (
        <div>
            <div id="map" style={{ width: "800px", height: "400px" }}></div>
        </div>
    );
}

export default KakaoMapForAccm;