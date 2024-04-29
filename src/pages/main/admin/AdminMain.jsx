/* eslint-disable */
import * as React from 'react';
import { Grid, Container } from '@mui/material';
import Box from '@mui/material/Box';
import ReservationStatus from './ReservationStatus';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../../hooks/RefreshTokenAuto';
import EmptyAccm from './EmptyAccm';

const list = {
  textAlign: 'center',
  bgcolor: 'background.paper',
  height: '10rem',
  mt: '1rem',
  padding: '1rem',
};

export default function AdminMain() {
  const [a_m_no, setA_m_no] = useState(0);
  const [checkAccm, setCheckAccm] = useState('');

  const token = useSelector((store) => store.accessToken.value);

  console.log('AdminMain a_m_no', a_m_no);

  useEffect(() => {
    console.log('AdminMain');
    if (token) {

      api.post("http://43.203.71.198/api/admin/member/adminInfo",)
        .then((response) => {
          if (response.data != null) {
            console.log('adminInfo', response.data.a_m_no);
            setA_m_no(response.data.a_m_no);
          }

        })
        .catch();
    }

    if (a_m_no > 0) {
      api.get("http://43.203.71.198/api/admin/accm/checkAccm", { params: { "a_m_no": parseInt(a_m_no) } },)
        .then((response) => {
          if (response.data != null) {
            console.log('[AdminMain] checkAccm', response.data);
            setCheckAccm(response.data);
          }

        }).catch((error) => {
          // 실패

        });
    }

  }, [token, a_m_no]);

  return (
    <Container component="main" sx={{
      display: { xs: 'xl', sm: 'block' },
      color: 'black',
      width: '100%',
      boxShadow: 'none',
      mt: '3rem'
    }}>
      {checkAccm == 1 && <ReservationStatus a_m_no={a_m_no} />}
      {checkAccm == 0 && <EmptyAccm />}
    </Container>
  );
}