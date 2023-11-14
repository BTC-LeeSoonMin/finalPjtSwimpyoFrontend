import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import api from "../../../../hooks/RefreshTokenAuto";

const listFilterStyle = {
  bgcolor: 'white',
  borderRadius: '4px',
  m: 1,
  minWidth: 150
}

export default function ResLogFilter({ setPeriod }) {
  const [periodFilter, setPeriodFilter] = useState('6');

  const periodChange = (e) => {
    console.log('e.target.value', e.target.value);
    setPeriod(e.target.value);
    setPeriodFilter(e.target.value);

  };

  return (
    <Box>
      <FormControl sx={{ ...listFilterStyle }} size="small">
        <InputLabel id="demo-select-small-label">기간</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={periodFilter}
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