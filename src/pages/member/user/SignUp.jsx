/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import dayjs from 'dayjs';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const today = dayjs();

function SignUp() {;
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState(''); // 비밀번호 확인 필드 추가
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

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

  const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;
  const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  const navigate = useNavigate();

  const createAccountConfirm = (e) => {
    e.preventDefault();

    let data = {};

    // 비밀번호가 일치하는 경우에만 요청을 보냄 
    if (regExpEmail.test(email) && patternPhone.test(phone)) {
      data = {
        "email": email,
        "pw": pw,
        "name": name,
        "birth": birth,
        "phone": phone,
        "nickname": nickname,
      }

      axios.post("/api/user/member/signUp", JSON.stringify(data), config,)
        .then((response) => {
          if (response.data === "MemberUserDup") {
            alert("사용중인 아이디입니다. 다른 아이디를 입력하세요.");

          } else if (response.data === "MemberUserSignUpSuccess") { 
            //성공 
            alert("회원가입에 성공했습니다. 로그인 후 서비스를 이용해보세요.");
            //로그인 페이지로 가도록 경로 변경하기
            navigate('/user/member/signIn');

          } else if (response.data === "MemberUserSignUpFail") {
            //DB 에러
            alert("통신 에러 다시 시도해주세요.");

          } else {
            //실패 
            alert("통신 에러 다시 시도해주세요.");

          }
        }).catch((error) => {
          // 실패

        });
    } else if (!patternPhone.test(phone)) {
      alert("연락처 형식이 틀립니다.");

    } else if (!regExpEmail.test(email)) {
      alert("메일 형식이 틀립니다.");

    } 

  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          회원가입
        </Typography>
        <form onSubmit={(e) => createAccountConfirm(e)} name='create_account_form' style={{ width: '100%', marginTop: 1 }}> 
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            // value={mail}
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
            sx={{mb: '24px'}}
          /> 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem>
              <DatePicker
                label={'생년월일'}
                disableFuture
                views={['year', 'month', 'day']}
                onChange={(newValue) => setBirth(newValue)}
              />
            </DemoItem>
          </LocalizationProvider>
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
            sx={{mt: '24px'}}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: '#F7323F', color: 'white', '&:hover': { backgroundColor: '#F7323F' } }} 
          >
            회원가입
          </Button>
        </form>
        <Link to="/user/member/signIn" style={linkStyle}>이미 계정이 있으신가요? 로그인</Link>
      </Paper>
    </Container>
  );
}

export default SignUp;