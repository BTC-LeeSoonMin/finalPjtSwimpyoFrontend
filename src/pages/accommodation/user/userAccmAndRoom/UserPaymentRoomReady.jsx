import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../../hooks/RefreshTokenAuto";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const UserPaymentRoomReady = () => {

    const [countdown, setCountdown] = useState(3); // 초기 카운트다운 값 3으로 설정

    useEffect(() => {
        // 카운트다운이 0이면 창을 닫음
        if (countdown === 0) {
            window.close();
            return;
        }

        // 1초마다 카운트다운 감소
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        // 컴포넌트 언마운트 시 인터벌 정리
        return () => clearInterval(interval);
    }, [countdown]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h2" component="h2" align="center">
                결제가 완료되었습니다
                <div>{countdown}초 후 창이 닫힙니다</div>
            </Typography>
        </Box>
    );
}

export default UserPaymentRoomReady;