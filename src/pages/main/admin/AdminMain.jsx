import * as React from 'react';
import { Grid, Container } from '@mui/material';
import Box from '@mui/material/Box';
import ReservationStatus from './ReservationStatus';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../hooks/RefreshTokenAuto';

const list = {
  textAlign: 'center',
  bgcolor: 'background.paper',
  height: '10rem',
  mt: '1rem',
  padding: '1rem',
};

export default function AdminMain() {
  const [a_m_no, setA_m_no] = useState('');
  const [checkAccm, setCheckAccm] = useState('');

  const token = useSelector((store) => store.accessToken.value);

  useEffect(() => {
    if (token) {

      api.post("/api/admin/member/adminInfo",)
        .then((response) => {
          if (response.data != null) {
            console.log('adminInfo', response.data.a_m_no);
            setA_m_no(response.data.a_m_no);
          }

        })
        .catch();
    }

    if (a_m_no != null) {
      api.get("/api/admin/accm/checkAccm", { params: { "a_m_no": parseInt(a_m_no) } },)
        .then((response) => {
          if (response.data != null) {
            console.log('[AdminMain] checkAccm', response.data);
            setCheckAccm(response.data);
          }

        }).catch((error) => {
          // 실패

        });
    }

  }, [token]);

  return (
    <Container component="main" sx={{
      display: { xs: 'none', sm: 'block' },
      color: 'black',
      width: '100%',
      boxShadow: 'none',
      mt: '3rem'
    }}>
      {checkAccm == 1 && <ReservationStatus a_m_no={a_m_no} />}
      {checkAccm == 0 && <Box sx={{ ...list }}> 숙박시설을 등록해보세요! </Box>}
    </Container>
  );
}