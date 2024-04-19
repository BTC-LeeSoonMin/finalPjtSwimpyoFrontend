/* eslint-disable */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../../hooks/RefreshTokenAuto';
import { useEffect } from 'react';
import { useState } from 'react';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '22px',
  fontWeight: 'normal',
};

const separatorStyle = {
  margin: '0 8px',
  color: 'white',
  fontWeight: 'normal',
};

export default function AdminNav() {

  const [a_m_no, setA_m_no] = useState('');
  const [checkAccm, setCheckAccm] = useState('');

  const token = useSelector((store) => store.accessToken.value);

  useEffect(() => {
    if (token) {

      api.post("/api/admin/member/adminInfo",)
        .then((response) => {
          if (response.data != null) {
            setA_m_no(response.data.a_m_no);
          }

        })
        .catch();
    }

    if (a_m_no > 0) {
      api.get("/api/admin/accm/checkAccm", { params: { "a_m_no": parseInt(a_m_no) } },)
        .then((response) => {
          if (response.data != null) {
            setCheckAccm(response.data);
          }

        }).catch((error) => {
          // 실패

        });
    }

  }, [token, a_m_no]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: 'black', boxShadow: 'none' }}
      >
        {' '}
        <Toolbar>
          {token && <Typography
            noWrap
            component="div"
            sx={{
              fontWeight: 'bold',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              width: '100%'
            }}
          >
            {checkAccm == 0 && <Link to="/admin/accommodation/registAccm" style={linkStyle}>
              숙박 시설 등록
            </Link>}
            {checkAccm == 0 && <span style={separatorStyle}>|</span>}

            {checkAccm == 1 && <Link to={`/admin/accommodation/detailAccm/${a_m_no}`} style={linkStyle}>
              나의 업소 관리
            </Link>}
            {checkAccm == 1 && <span style={separatorStyle}>|</span>}
            <Link to="/admin/member/modify" style={linkStyle}>
              계정 수정
            </Link>

          </Typography>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}