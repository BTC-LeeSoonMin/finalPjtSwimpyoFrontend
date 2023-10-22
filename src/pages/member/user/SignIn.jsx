import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Grid } from '@mui/material';

function SignIn() {
  const [id, setID] = useState('');
  const [pw, setPw] = useState('');

  const handleLogin = () => {
    // 로그인 로직을 이곳에 추가하세요
    console.log('ID:', id);
    console.log('PW:', pw);
    // 로그인 로직을 처리한 후, 사용자를 인증하고 다음 단계로 이동할 수 있습니다.
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'normal',
  };

  // const signInForm = () => {
  //   console.log("click SignIn");
  //   console.log("ID : ", id);
  //   console.log("PW : ", pw);
  //   axios
  //     .post("http://localhost:8090/api/member/signin", {
  //       id: id,
  //       pw: pw,
  //     })
  //     .then((member) => {
  //       console.log(member);
  //       if (member.id === undefined) {
  //         // id 일치하지 않는 경우 userId = undefined,'입력하신 id 가 일치하지 않습니다.'
  //         console.log("======================존재하지 않는 ID입니다.");
  //         alert("존재하지 않는 ID입니다.");
  //       } else if (member.id === null) {
  //         // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
  //         console.log(
  //           "======================입력하신 비밀번호 가 일치하지 않습니다."
  //         );
  //         alert("입력하신 비밀번호 가 일치하지 않습니다.");
  //       } else if (member.id === id) {
  //         // id, pw 모두 일치 userId = userId1, msg = undefined
  //         console.log("======================", "로그인 성공");
  //         sessionStorage.setID("id", id); // sessionStorage에 id를 user_id라는 key 값으로 저장

  //       }
  //       // 작업 완료 되면 페이지 이동(새로고침)
  //       document.location.href = "/home_p";
  //     })
  //     .catch();
  // };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          로그인
        </Typography>
        <form onSubmit={handleLogin} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="아이디"
            name="id"
            autoComplete="id"
            value={id}
            onChange={(e) => setID(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pw"
            label="비밀번호"
            type="pw"
            id="pw"
            autoComplete="current-password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: 'skyblue', color: 'white' }} // 검정색 배경, 흰색 글자색
          >
            로그인
          </Button>
        </form>
        <a href="/user/member/signUp" style={linkStyle}>계정이 없으신가요? 회원가입</a>
      </Paper>
    </Container>
  );
}

export default SignIn;
