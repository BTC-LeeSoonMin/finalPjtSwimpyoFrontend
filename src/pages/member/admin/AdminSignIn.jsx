import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../../commons/rtk/slice/SignInSlice';
import { useSelector,useDispatch } from 'react-redux';
import api from '../../../hooks/RefreshTokenAuto';

function AdminSignIn() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  
  const dispatch = useDispatch();
  const token = useSelector((store)=> store.accessToken.value);
  console.log('a', token);

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'normal',
  };

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  const signInForm = (e) => {
    e.preventDefault();

    console.log("click SignIn");
    console.log("email : ", email);
    console.log("pw : ", pw);

    let data = {};

    data = {
      "email": email,
      "pw": pw,
    }

    api.post("/api/member/admin/signIn", JSON.stringify(data), config,)
      .then((response) => {

        if (response.data === "MemberAdminLoginFail") {
          console.log("================존재하지 않는 정보입니다.", response.data);
          alert("존재하지 않는 정보입니다.");

        } else if (response.data === "IncorrectIdOrPw") {
          console.log("======================이메일 또는 비밀번호가 일치하지 않습니다.", response.data);
          alert("이메일 또는 비밀번호가 일치하지 않습니다.");

        } else if (response.data !== null) {
          console.log("======================로그인 성공");
          // 작업 완료 되면 관리자 메인 페이지 이동하도록 변경하기
          console.log('로그인 성공', response.data); 
          dispatch(setAccessToken.setAccessToken(response.data));
          navigate('/admin');

        } else {
          console.log("로그인 실패");
          alert("통신 에러 다시 시도해주세요.");
        }

      })
      .catch();
  };

  const navigate = useNavigate();

  return (
    <>
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          관리자 로그인
        </Typography>
        <form onSubmit={(e) => signInForm(e)} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pw"
            label="비밀번호"
            type="password"
            id="pw"
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          /> 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'black', color: 'white' }} // 검정색 배경, 흰색 글자색
          >
            로그인
          </Button>
        </form>
        <a href="/member/admin/signUp" style={linkStyle}>계정이 없으신가요? 회원가입</a>
      </Paper>
    </Container>
    </>
  );
}

export default AdminSignIn;
