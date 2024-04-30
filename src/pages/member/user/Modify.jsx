/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAccessToken } from '../../../commons/rtk/slice/SignInSlice';
import api from '../../../hooks/RefreshTokenAuto';

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 'normal',
};

function Modify() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {

    api.post("soonmin.info/api/user/member/userInfo",
      config,
    )
      .then(response => {
        setEmail(response.data.u_m_email);
        setPw(response.data.u_m_pw);
        setNickname(response.data.u_m_nickname);
        setName(response.data.u_m_name);
        setBirth(response.data.u_m_birth);
        setPhone(response.data.u_m_phone);
      }
      )
      .catch(error => console.log(error))

  }, []);

  const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

  const modify = (e) => {
    e.preventDefault();

    let data = {};

    // 이메일, 연락처 유효성 검사 확인 후
    if (patternPhone.test(phone)) {
      data = {
        "name": name,
        "phone": phone,
        "nickname": nickname,
      }

      api.post("soonmin.info/api/user/member/modify", JSON.stringify(data), config,)
        .then((response) => {
          if (response.data === "MemberUserModifySuccess") {
            navigate('/user/myPage');

          } else if (response.data === "MemberUserModifyFail") {
            alert('다시 시도해주세요');

          } else if (response.data === -1) {
            alert('다시 시도해주세요');

          } 
        }).catch((error) => {
          // 실패

        });
    } else if (!patternPhone.test(phone)) {
      alert("연락처 형식이 틀립니다.");

    }

  };

  const navigate = useNavigate();

  const signOut = (e) => {
    e.preventDefault();

    if(window.confirm("정말 탈퇴하시겠습니까?")) {
      api.post("soonmin.info/api/user/member/signout", config,)
        .then((response) => {
          if(response.data === "signOutSuccess") {
            //탈퇴 성공
            dispatch(setAccessToken.setAccessToken(''));
            alert('탈퇴되었습니다.');
            navigate('/user/member/signIn');
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

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold'}}>
          정보 수정
        </Typography>
        <form onSubmit={(e) => modify(e)} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            label="email" variant="filled"
            margin="normal"
            fullWidth
            id="email"
            name="email"
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
          <Link to="/user/member/changePw" style={linkStyle}>
            <Button
              variant="contained"
              sx={{ ml: 2, mt: 3, backgroundColor: '#F7323F', color: 'white', '&:hover': { backgroundColor: '#F7323F' } }}
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
          <TextField
            label="닉네임"
            variant="filled"
            margin="normal"
            required
            fullWidth
            id="nickname"
            name="nickname"
            value={nickname || ''}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#F7323F', color: 'white', '&:hover': { backgroundColor: '#F7323F' } }} 
          >
            회원 정보 수정
          </Button>
        </form>
      </Paper>
      <Button
        variant="contained"
        sx={{ mt: 3, backgroundColor: '#F7323F', '&:hover': { backgroundColor: '#F7323F' } }}
        onClick={(e) => signOut(e)}
      >
        회원탈퇴
      </Button>
    </Container>
  );
}

export default Modify;