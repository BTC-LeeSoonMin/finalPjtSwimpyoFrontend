import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

const list = {
    bgcolor: 'background.paper',
    height: '12rem',
    textAlign: 'center',
    mt: '1rem',
    padding: '1rem', 
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

function Filter() {
    const [area, setArea] = useState('');
    const [price, setPrive] = useState('');

    const areaChange = (e) => {
      setArea(e.target.value);
    };

    const priceChange = (e) => {
        setPrive(e.target.value);
    };

    return (
        <Box sx={{ ...list, borderRadius: '10px'}}>
            <Typography sx={{...titleFont}}>
                필터
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="demo-select-small-label">지역</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={area}
                label="Area"
                onChange={areaChange}
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
                onChange={priceChange}
            >
                <MenuItem value="">
                {' '}
                <em>None</em>{' '}
                </MenuItem>
                <MenuItem value={'부산'}>높은 순민</MenuItem>
                <MenuItem value={'서울'}>낮은 순민</MenuItem>
            </Select>
            </FormControl>

            <Typography sx={{mt: '10px'}}>
                <Link style={linkStyle}>대실</Link> / <Link style={linkStyle}>숙박</Link>
            </Typography>
        </Box>
    );
}

export default Filter;