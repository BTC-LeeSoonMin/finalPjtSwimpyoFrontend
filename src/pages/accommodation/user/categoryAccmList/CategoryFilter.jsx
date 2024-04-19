/* eslint-disable */

import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom';

const list = {
    bgcolor: 'background.paper',
    width: '12rem',
    height: '14rem',
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

function CategoryFilter({setFilter}) {
    const [area, setArea] = useState('all');
    const [price, setPrice] = useState('０');
    const [stay, setStay] = useState('숙박');
    const [able, setAble] = useState('all');

    useEffect(() => {
        console.log('Filter area', area);
        console.log('Filter price', price);
        console.log('Filter stay', stay);
        console.log('Filter able', able);

        setFilter([area, price, stay, able]);

    }, [area, price, stay, able]);

    const ableCheck = (e) => {
        setAble(e.target.checked ? 'possible' : 'all');
    }

    return (
        <Box sx={{ ...list, borderRadius: '10px' }}>
            <Typography sx={{ ...titleFont }}>
                필터
            </Typography>

            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel id="demo-select-small-label">지역</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={area}
                    label="Area"
                    onChange={(e) => setArea(e.target.value)}
                >
                    <MenuItem value={'all'}>
                        {' '}
                        <em>전체</em>{' '}
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
                    onChange={(e) => setPrice(e.target.value)}
                >
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

export default CategoryFilter;