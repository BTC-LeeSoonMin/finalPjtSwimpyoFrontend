import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Modify() {
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {
    console.log('adminModify start');

    axios.post("/api/admin/member/adminInfo",
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
    console.log("click SignUp");
    console.log("name : ", name);
    console.log("phone : ", phone);

    let data = {};

    // 비밀번호가 일치하는 경우에만 요청을 보냄 
    if (patternPhone.test(phone)) {
      data = {
        "name": name,
        "phone": phone,
        "email": email,
      }

      axios.post("/api/admin/member/modify", JSON.stringify(data), config,)
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
          // 실패

        });
    } else if (!patternPhone.test(phone)) {
      alert("연락처 형식이 틀립니다.");
      console.log("연락처 형식이 틀립니다.")

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
          /><Button
          variant="contained"
          href='/admin/member/changePassword'
          sx={{ ml: 2, mt: 3, backgroundColor: 'black', color: 'white' }} // 검정색 배경, 흰색 글자색
        >
          비밀번호 수정
        </Button>
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
            sx={{ mt: 2, mb: 2, backgroundColor: 'black', color: 'white' }} // 검정색 배경, 흰색 글자색
          >
            회원 정보 수정
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Modify;