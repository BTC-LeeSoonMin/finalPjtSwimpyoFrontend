import React, { useEffect } from 'react';
import DaumPostcodeEmbed, { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

const PostcodeComponent = (props) => {

    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; //추가될 주소
        let localAddress = data.sido + ' ' + data.sigungu; //지역주소(시, 도 + 시, 군, 구)
        if (data.addressType === 'R') { //주소타입이 도로명주소일 경우
            if (data.bname !== '') {
                extraAddress += data.bname; //법정동, 법정리
            }
            if (data.buildingName !== '') { //건물명
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            //지역주소 제외 전체주소 치환
            fullAddress = fullAddress.replace(localAddress, '');

            // 합쳐진 주소 만들기
            let combinedAddress = localAddress + ' ' + fullAddress + (extraAddress !== '' ? ` (${extraAddress})` : '');

            //조건 판단 완료 후 지역 주소 및 상세주소 state 수정
            props.setAddressObj({
                // areaAddress: localAddress,
                // detailAddress: fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '')
                combinedAddress: combinedAddress
            });
        }
    }

    const handleClick = () => {
        open({ onComplete: handleComplete });
    }


    return (
        <>
            <button type="button" onClick={handleClick}>주소찾기</button>
        </>
    );
}

export default PostcodeComponent;