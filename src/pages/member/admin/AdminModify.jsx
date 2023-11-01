import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../../commons/rtk/slice/SignInSlice';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../hooks/RefreshTokenAuto';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 'normal',
};

function AdminModify() {
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();
  const token = useSelector((store)=> store.accessToken.value);

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {
    console.log('adminModify start');

    api.post("/api/admin/member/adminInfo",
      config,
    )
      .then(response => {
        console.log(response.data);
        setEmail(response.data.a_m_email);
        setPw(response.data.a_m_pw);
        setName(response.data.a_m_name);
        setPhone(response.data.a_m_phone);
      }
      )
      .catch(error => console.log(error))

  }, []);

  const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

  const modify = (e) => {
    e.preventDefault();
    console.log("click Modify");
    console.log("name : ", name);
    console.log("phone : ", phone);

    let data = {};

    // 연락처 유효성 검사 후
    if (patternPhone.test(phone)) {
      data = {
        "name": name,
        "phone": phone,
        "email": email,
      }

      api.post("/api/admin/member/modify", JSON.stringify(data), config,)
        .then((response) => {
          console.log(response.data)
          if (response.data === "MemberAdminModifySuccess") {
            console.log('성공');
            navigate('/admin');

          } else if (response.data === "MemberAdminModifyFail") {
            console.log('실패');

          } else if (response.data === -1) {
            console.log('-1');

          } else {
            console.log('fail');


          }
        }).catch((error) => {
          // 실패 힝힝 속상하다리 ㅠ

        });
    } else if (!patternPhone.test(phone)) {
      alert("연락처 형식이 틀립니다.");
      console.log("연락처 형식이 틀립니다.")

    }

  };

  const signOut = (e) => {
    e.preventDefault();
    console.log("click SignOut");

    if(window.confirm("정말 탈퇴하시겠습니까?")) {
      api.post("/api/admin/member/signout", config,)
        .then((response) => {
          console.log('response.data ===', response.data);
          if(response.data === "signOutSuccess") {
            //탈퇴 성공
            dispatch(setAccessToken.setAccessToken(''));
            alert('탈퇴되었습니다.');
            navigate('/admin/member/signIn');
          } else if(response.data === "signOutFail") {
            //실패 
            alert('탈퇴 실패. 다시 시도해주세요.');
          } else if(response.data === "signOutFail") {
            //실패 
            alert('탈퇴 실패. 다시 시도해주세요.');
          } else {
            //실패 
            alert('탈퇴 실패. 다시 시도해주세요.');
          }

        }).catch((error) => {

        });

    } else {
      alert('탈퇴 취소');
    }

  };

  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          관리자 정보 수정
        </Typography>
        <form onSubmit={(e) => modify(e)} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            label="Filled" variant="filled"
            margin="normal"
            fullWidth
            id="mail"
            name="mail"
            autoComplete="email"
            value={email}
            disabled
          />
          <TextField
            label="*******" variant="filled"
            margin="normal"
            name="pw"
            type="password"
            id="password"
            autoComplete="new-password"
            value={pw}
            disabled
          />
          <Link to="/admin/member/changePw" style={linkStyle}>
            <Button
              variant="contained"
              sx={{ ml: 2, mt: 3, backgroundColor: 'black', color: 'white' }}
            >
              비밀번호 변경
            </Button>
          </Link>
          <TextField
            label="이름"
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="연락처"
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="phone"
            name="phone"
            value={phone || ''}
            autoFocus
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: 'black', color: 'white' }} 
          >
            회원 정보 수정
          </Button>
        </form>
      </Paper>
      <Button
        variant="contained"
        sx={{ mt: 3, backgroundColor: 'black' }} 
        onClick={(e) => signOut(e)}
      >
        회원탈퇴
      </Button>
    </Container>
  );
}

export default AdminModify;