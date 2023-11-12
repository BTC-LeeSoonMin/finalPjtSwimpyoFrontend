import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../../../hooks/RefreshTokenAuto";

const PayResult = () => {

    const location = useLocation();
    console.log("location", location);

    const queryParams = new URLSearchParams(location.search);
    const pg_token = queryParams.get('pg_token');


    // const queryString = location.search;
    // const tp_query = queryString.split("=")[1];

    console.log("pg_token", pg_token);


    const [params, setParams] = useState({
        cid: location.state.location.cid,
        tid: location.state.locaion.tid,
        partner_order_id: location.state.partner_order_id,
        partner_user_id: location.state.partner_user_id,
        pg_token: `${pg_token}`,
    });
    console.log("params", params);


    const [approvalUrl, setApprovalUrl] = useState('');
    const [failUrl, setFailUrl] = useState('');
    const [cancelUrl, setCancelUrl] = useState('');


    useEffect(() => {
        console.log("useEffect");

        console.log("test");
        const data = new FormData();

        const jsonBlob = new Blob([JSON.stringify({
            u_m_email: location.state.dataForPayment.u_m_email,
            u_r_name: location.state.dataForPayment.u_r_name,
            u_r_phone: location.state.dataForPayment.u_m_phone,
            a_r_no: location.state.dataForPayment.a_r_no,
            u_r_check_in: location.state.dataForPayment.u_r_check_in,
            u_r_check_out: location.state.dataForPayment.u_r_check_out,
            u_r_stay_yn: location.state.dataForPayment.u_r_stay_yn,
            u_r_car_yn: location.state.dataForPayment.u_r_car_yn,
            a_r_price: location.state.dataForPayment.a_r_price,
            a_acc_name: location.state.dataForPayment.a_acc_name,
            a_r_name: location.state.dataForPayment.a_r_name,
            a_r_check_in: location.state.dataForPayment.a_r_check_in,
            a_r_check_out: location.state.dataForPayment.a_r_check_out,
            a_acc_no: location.state.dataForPayment.a_acc_no,
            a_acc_name: location.state.dataForPayment.a_acc_name,
            next_redirect_pc_url: location.state.nextRedirectPcUrl,
            tid: location.state.tid,
            created_at: location.state.created_at,
            partner_order_id: location.state.partner_order_id
        })], { type: "application/json" });
        data.append("reservationDto", jsonBlob);

        console.log("data", data);

        const response = api.post(`/api/user/reservation/registConfirm?pg_token=${pg_token}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("response.data", response.data);

    }, []);




    console.log("params", params);

    useEffect(() => {
        // const {
        //   location: { queryString },
        // } = props;
        // // url에 붙어서 온 pg_token을 결제 API에 줄 params에 할당
        // setParams((prevParams) => ({
        //   ...prevParams,
        //   pg_token: queryString.split("=")[1],
        // }));
        console.log("tp!!!!");
        axios({
            url: "https://kapi.kakao.com/v1/payment/approve",
            method: "POST",
            headers: {
                Authorization: "KakaoAK 1980ead0ae347e6c0c29225e22ede43c",
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
            params,
        }).then((response) => {
            // 결제 승인에 대한 응답 출력
            console.log(response);
        });
    }, [params]);

    return (
        <h2>Success page</h2>
    );
}

export default PayResult;