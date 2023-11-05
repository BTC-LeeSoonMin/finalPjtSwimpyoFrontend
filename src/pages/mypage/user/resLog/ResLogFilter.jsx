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

    const categoryChange = (e) => {
        const category = e.target.value
        console.log('category', category);
    
        api.post("/api/user/mypage/resLogList", JSON.stringify(category), config,)
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
            <FormControl sx={{  ...listFilterStyle, }} size="small">
                <InputLabel id="demo-select-small-label">카테고리</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={category}
                    label="Category"
                    onChange={(e) => categoryChange(e)}
                >
                    <MenuItem value="">{' '}<em>카테고리전체</em>{' '}</MenuItem>
                    <MenuItem value={'호텔/리조트'}>호텔/리조트</MenuItem>
                    <MenuItem value={'펜션/풀빌라'}>펜션/풀빌라</MenuItem>
                    <MenuItem value={'모텔'}>모텔</MenuItem>
                    <MenuItem value={'캠핑/글램핑'}>캠핑/글램핑</MenuItem>
                    <MenuItem value={'게스트하우스'}>게스트하우스</MenuItem>
                </Select>
            </FormControl>

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