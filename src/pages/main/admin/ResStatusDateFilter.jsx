import * as React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

const today = dayjs();

export default function ResStatusDateFilter({setDate}) {
    
    const dateFiler = (newValue) => {
        setDate(dayjs(newValue).format("YYYY-MM-DD"));
    }

        return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <DemoItem>
                        <DatePicker
                            defaultValue={today}
                            sx={{ width: 260 }}
                            onChange={(newValue) => dateFiler(newValue)}
                        />
                    </DemoItem>
                </Box>
            </LocalizationProvider>
        );
    }