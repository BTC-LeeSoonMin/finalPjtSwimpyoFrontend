import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Box } from '@mui/material';
import api from '../../../../hooks/RefreshTokenAuto';
import { useEffect, useState } from 'react';

const dateStyle = {
    textAlign: 'center', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '100%'
}

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

function DateFilter() {
    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(tomorrow);

    const config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
    };

    useEffect(() => {
        console.log('checkIn', checkIn);
        console.log('checkOut', checkOut);
    }, [checkOut]);

    const dateFiler = (newValue) => {
        console.log('날짜', newValue);
        console.log('날짜1', newValue[0]);
        console.log('날짜2', newValue[1]);
        setCheckIn(newValue[0]);
        if(newValue[1] !== null ) {
            setCheckOut(newValue[1]);
        }

        let data = {
            "date" : newValue, 
        };

        // api.post("/api/user/searchAccm", JSON.stringify(data), config,)
        //     .then((response))
    }

    return (
        <Box sx={{ ...dateStyle}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem component="DateRangePicker">
                    <DateRangePicker 
                        defaultValue={[today, tomorrow]} 
                        minDate={tomorrow} localeText={{ start: '체크인', end: '체크아웃' }} 
                        sx={{bgcolor: 'white', padding: '1rem', borderRadius: '10px' }}
                        onChange={(newValue) => dateFiler(newValue)}
                        />
                </DemoItem>
            </LocalizationProvider>
        </Box>

    );
}

export default DateFilter;