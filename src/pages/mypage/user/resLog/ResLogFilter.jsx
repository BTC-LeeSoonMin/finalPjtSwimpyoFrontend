import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import api from "../../../../hooks/RefreshTokenAuto";

const listFilterStyle = {
    bgcolor: 'white', 
    borderRadius: '4px', 
    m: 1, 
    minWidth: 150
}

export default function ResLogFilter() {

    const config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };

    const periodChange = (e) => {
        const period = e.target.value
        console.log('period', period);

        api.post("/api/user/mypage/resLogList", JSON.stringify(period), config,)
          .then((response) => {
    
            if (response.data === "Fail") {
              console.log("해당 데이터가 없습니다.", response.data);
              alert("존재하지 않는 정보입니다.");
    
            } else if (response.data === "success") {
              console.log("", response.data);
              alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    
            } 
    
          })
          .catch();

    };

    return(
        <Box>
            <FormControl sx={{ ...listFilterStyle }} size="small">
                <InputLabel id="demo-select-small-label">기간</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={period}
                    label="Period"
                    onChange={(e) => periodChange(e)}
                >
                    <MenuItem value={'3'}>최근 3개월</MenuItem>
                    <MenuItem value={'6'}>최근 6개월</MenuItem>
                    <MenuItem value={'12'}>최근 1년</MenuItem>
                    <MenuItem value={'24'}>최근 2년</MenuItem>
                </Select>
            </FormControl>
        </Box>

    );
}