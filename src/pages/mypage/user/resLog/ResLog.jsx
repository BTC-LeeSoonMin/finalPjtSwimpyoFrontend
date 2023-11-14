import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import api from '../../../../hooks/RefreshTokenAuto';
import ResLogFilter from './ResLogFilter';
import ResLogList from './ResLogList';

const list = {
    align: 'center',
    bgcolor: 'background.paper',
    height: '10rem',
    mt: '1rem',
    padding: '1rem',
};

function ResLog() {
    const [period, setPeriod ] = useState('6');
    const [resLogList, setResLogList] = useState([]);

    console.log('resLogList', resLogList);

    const config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
    };

    useEffect(() => {
    
        console.log('period', period);
    
        api.get("/api/user/mypage/GetRezList", JSON.stringify(period), config,)
          .then((response) => {
            console.log('response.data', response.data);
            if(response.data != null) {
                setResLogList(response.data);
            } 
        });
    
      }, [period]);

    return (
        <>
            <ResLogFilter setPeriod={setPeriod}/>
            {(resLogList.length != 0) && resLogList.map((item) => (<ResLogList  {...item}  />))}
            {(resLogList.length == 0) && 
              <Box sx={{ ...list, borderRadius: '10px' }}>
                검색 결과가 없습니다.
              </Box>}
            <ResLogList />
        </>
    );
}

export default ResLog;