import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

function SignUp() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState(''); // 비밀번호 확인 필드 추가
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');

  const [pwCheck, setPwCheck] = useState(true);

  const config = {
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
};

  const linkStyle = {
    color: 'black', 
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'normal',
  };

  const onChangePwCheck = (e) => {
    const confirmPassword = e.target.value;
    setPwConfirm(confirmPassword);

    // 비밀번호와 비밀번호 확인이 일치하는지 여부를 확인하고 상태 설정
    setPwCheck(pw === confirmPassword);

  }

  const createAccountConfirm = () => {
    console.log("click SignUp");
    console.log("ID : ", id);
    console.log("PW : ", pw);
    console.log("pwConfirm : ", pwConfirm);
    console.log("name : ", name);
    console.log("nickname : ", nickname);
    console.log("phone : ", phone);
    console.log("mail : ", mail);

    let data = {};

    // 비밀번호가 일치하는 경우에만 요청을 보냄 
    if (pwCheck) {
      data = {
        "id": id,
        "pw": pw,
        "name": name,
        "mail": mail,
        "phone": phone,
        "nickname": nickname,
      }
      
      axios.post("/api/member/signup", JSON.stringify(data), config, )
      .then((response) => {
        console.log(response.data)
        if(response.data === 2 ){
          console.log('사용중인 아이디입니다.');
          
        } else if(response.data === 1) {
          //성공
          console.log('성공');
          document.location.href = "/home_p";

        }else {
          console.log('fail');

        }
      }).catch((error) => {
        // 실패

      });
    }
    
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          회원가입
        </Typography>
        <form onSubmit={createAccountConfirm} name='create_account_form' style={{ width: '100%', marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="id"
            label="ID"
            name="id"
            autoComplete="username"
            // value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pw"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="new-password"
            // value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="pwConfirm"
            label="비밀번호 확인"
            type="password"
            id="pwConfirm"
            autoComplete="new-password"
            // value={pwConfirm}
            onChange={onChangePwCheck}
          />
          {!pwCheck && (<Typography variant="body2" color="error">
          비밀번호가 일치하지 않습니다.
          </Typography>)}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="이름"
            name="name"
            // value={name}
            onChange={(e) => setName(e.target.value)}
          /> 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="닉네임"
            name="nickname"
            // value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="연락처"
            name="phone"
            // value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mail"
            label="이메일"
            name="mail"
            autoComplete="email"
            // value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: 'black', color: 'white' }} // 검정색 배경, 흰색 글자색
            // onClick={createAccountForm}
          >
            회원가입
          </Button>
        </form>
        <a href="/user/member/signIn" style={linkStyle}>이미 계정이 없으신가요? 로그인</a>
      </Paper>
    </Container>
  );
}

export default SignUp;