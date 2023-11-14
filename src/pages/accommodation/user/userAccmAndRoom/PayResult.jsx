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



    return (
        <h2>Success page</h2>
    );
}

export default PayResult;