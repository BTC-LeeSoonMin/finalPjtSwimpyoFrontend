/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Box, Container, Paper } from '@mui/material';
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
  const [period, setPeriod] = useState('6');
  const [resLogList, setResLogList] = useState([]);

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {

    api.get("http://43.203.71.198/api/user/mypage/GetRezList", JSON.stringify(period), config,)
      .then((response) => {
        if (response.data != null) {
          setResLogList(response.data);
        }
      });

  }, [period]);

  return (
    <Container component="main" sx={{ marginBottom: '3rem', marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', margin: 'auto' }}> 
      <ResLogFilter setPeriod={setPeriod} />
      {(resLogList.length != 0) && resLogList.map((item) => (<ResLogList  {...item} sx={{ justifyContent: 'flex-first' }} />))} 
      {(resLogList.length == 0) && 
        <Box sx={{ ...list, borderRadius: '10px' }}> 
          예약 정보가 없습니다.
        </Box>}
        </Paper>
    </Container>
  );
}

export default ResLog;