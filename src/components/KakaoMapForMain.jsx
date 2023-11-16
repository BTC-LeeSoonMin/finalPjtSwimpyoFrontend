import React, { useEffect } from "react";
import markerImage from '../imgs/markerImage.png'
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";

const KakaoMapForMain = ({ accmAddress }) => {

    console.log("카카오맵으로 왔나", accmAddress);


    useEffect(() => {

        let container = document.getElementById('map');
        let options = { //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
            level: 10 //지도의 레벨(확대, 축소 정도)
        };

        let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        const geocoder = new window.kakao.maps.services.Geocoder();

        // accmAddress 배열 내의 모든 주소에 대해 좌표를 검색하고 마커를 생성
        accmAddress.forEach((addressObj) => {
            geocoder.addressSearch(addressObj.a_acc_address, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {

                    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);


                    let imageSrc = markerImage;
                    let imageSize = new window.kakao.maps.Size(50, 50);
                    let imageOption = { offset: new window.kakao.maps.Point(27, 50) };
                    let markerComplete = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);


                    // 마커를 생성하고 지도에 표시
                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords,
                        image: markerComplete
                    });


                    // 마커의 info를 생성
                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: `
                        <div style="
                          padding: 5px; 
                         
                        ">
                          ${addressObj.a_acc_name}
                        </div>
                      `
                    });


                    // 마커에 마우스오버 이벤트를 등록
                    window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                        infowindow.open(map, marker); // 정보창을 마커 위에 표시
                    });

                    // 마커에 마우스아웃 이벤트를 등록
                    window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                        infowindow.close();
                    });

                    map.setCenter(coords, marker);
                }
            });
        });

    }, [accmAddress])
    return (
        <div>
            <div id="map" style={{
                width: "418px", height: "374px", margin: '20px', borderRadius: '10px', // 모서리 둥글게
                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'
            }}></div>
        </div>
    );
}

export default KakaoMapForMain;