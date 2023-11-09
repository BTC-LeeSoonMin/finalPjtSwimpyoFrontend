import React, { useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../hooks/RefreshTokenAuto';
import axios from 'axios';
import dayjs from 'dayjs';

const list = {
    bgcolor: 'background.paper',
    width: '12rem',
    height: '18rem',
    textAlign: 'center',
    mt: '1rem',
    padding: '1rem',
    position: 'fixed',
};

const titleFont = {
    fontSize: '20px',
    fontWeight: 'bold',
};

const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: 'normal',
};

function Filter({ data }) {
    // function Filter() {
    const [category, setCategory] = useState('호텔/리조트');
    const [area, setArea] = useState('서울');
    const [price, setPrice] = useState('０');
    const [stay, setStay] = useState('숙박');
    const [able, setAble] = useState('all');
    // const [startDay, setStartDay] = useState([]);
    // const [endDay, setEndDay] = useState([]);

    const config = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    // console.log("0 : ", data[0])
    // console.log("1 : ", data[1])
    // console.log("99 : ", data)

    // const startDay = useRef(data[0]);
    // const endDay = useRef(data[1]);
    // console.log("useRef startDay : ", startDay);

    // setStartDay(data[0]);
    // setEndDay(data[1]);

    const navigate = useNavigate();

    useEffect(() => {
        console.log('Filter category', category);
        console.log('Filter area', area);
        console.log('Filter price', price);
        console.log('Filter stay', stay);
        console.log('Filter able', able);
        // console.log('Filter data', data[1]);
        // console.log("0000000 : ", data[0])
        // console.log("1111111 : ", data[1])

        let startDay = data[0];
        let endDay = data[1];
        console.log("0000000 : ", startDay);
        console.log("1111111 : ", endDay);


        let filter = {};
        filter = {
            "startDay": dayjs(startDay).format("YYYY-MM-DD"),
            "endDay": dayjs(endDay).format("YYYY-MM-DD"),
            "accmValue": category,
            "region": area,
            "priceOrder": price,
            "able": able,
            "dayUseOrStay": stay,
        };

        console.log("0000000555 : ", filter.startDay);
        console.log("11111116666 : ", filter.endDay);

        axios.post("/api/user/accm/search", JSON.stringify(filter), config,)
            .then((response) => {
                console.log('필터', response.data);
                navigate('/user/searchAccm', { state: response.data });

            });

    }, [category, area, price, stay, able, data]);

    const ableCheck = (e) => {
        setAble(e.target.checked ? 'possible' : 'all');
    }

    return (
        <Box sx={{ ...list, borderRadius: '10px' }}>
            <Typography sx={{ ...titleFont }}>
                필터
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel id="demo-select-small-label">카테고리</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <MenuItem value="">{' '}<em>카테고리전체</em>{' '}</MenuItem>
                    <MenuItem value={'호텔/리조트'}>호텔/리조트</MenuItem>
                    <MenuItem value={'펜션/풀빌라'}>펜션/풀빌라</MenuItem>
                    <MenuItem value={'모텔'}>모텔</MenuItem>
                    <MenuItem value={'캠핑/글램핑'}>캠핑/글램핑</MenuItem>
                    <MenuItem value={'게스트하우스'}>게스트하우스</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel id="demo-select-small-label">지역</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={area}
                    label="Area"
                    // onChange={(e) => areaChange(e)}
                    onChange={(e) => setArea(e.target.value)}
                >
                    <MenuItem value="">
                        {' '}
                        <em>None</em>{' '}
                    </MenuItem>
                    <MenuItem value={'부산'}>부산</MenuItem>
                    <MenuItem value={'서울'}>서울</MenuItem>
                    <MenuItem value={'경기'}>경기</MenuItem>
                    <MenuItem value={'제주'}>제주</MenuItem>
                    <MenuItem value={'인천'}>인천</MenuItem>
                    <MenuItem value={'강원'}>강원</MenuItem>
                    <MenuItem value={'경상'}>경상</MenuItem>
                    <MenuItem value={'전라'}>전라</MenuItem>
                    <MenuItem value={'충청'}>충청</MenuItem>
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel id="demo-select-small-label">가격</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={price}
                    label="Price"
                    // onChange={(e) => priceChange(e)}
                    onChange={(e) => setPrice(e.target.value)}
                >
                    <MenuItem value="">
                        {' '}
                        <em>None</em>{' '}
                    </MenuItem>
                    <MenuItem value={'１'}>높은 순</MenuItem>
                    <MenuItem value={'０'}>낮은 순</MenuItem>
                </Select>
            </FormControl>

            <Typography sx={{ mt: '10px' }}>
                <Link onClick={(e) => setStay('대실')} style={linkStyle}>대실</Link> / <Link onClick={(e) => setStay('숙박')} style={linkStyle}>숙박</Link>
            </Typography>

            <FormControlLabel control={<Checkbox color="success" checked={able === 'possible'} onChange={(e) => ableCheck(e)} />} label="예약가능여부" />
        </Box>
    );
}

export default Filter;