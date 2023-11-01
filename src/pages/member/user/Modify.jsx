import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Modify() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

  useEffect(() => {
    console.log('userModify start');

    axios.post("/api/user/member/userInfo",
      config,
    )
      .then(response => {
        console.log(response.data);
        setId(response.data.u_m_id);
        setPw(response.data.u_m_pw);
        setNickname(response.data.u_m_nickname);
        setName(response.data.u_m_name);
        setPhone(response.data.u_m_phone);
        setEmail(response.data.u_m_email);
      }
      )
      .catch(error => console.log(error))

  }, []);

  const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

  const modify = (e) => {
    e.preventDefault();
    console.log("click SignUp");
    console.log("u_m_nickname : ", nickname);
    console.log("u_m_name : ", name);
    console.log("u_m_phone : ", phone);
    console.log("u_m_email : ", email);

    let data = {};

    // 비밀번호가 일치하는 경우에만 요청을 보냄 
    if (patternPhone.test(phone)) {
      data = {
        "name": name,
        "phone": phone,
        "email": email,
      }

      axios.post("/api/user/member/modify", JSON.stringify(data), config,)
        .then((response) => {
          console.log(response.data)
          if (response.data === "MemberUserModifySuccess") {
            console.log('성공');
            navigate('/');

          } else if (response.data === "MemberUserModifyFail") {
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
          정보 수정
        </Typography>
        <form onSubmit={(e) => modify(e)} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            label="Filled" variant="filled"
            margin="normal"
            fullWidth
            id="id"
            name="id"
            autoComplete="id"
            value={id}
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
          href='/user/member/changePassword'
          sx={{ ml: 2, mt: 3, backgroundColor: 'skyblue', color: 'white' }} 
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
            sx={{ mt: 3, mb: 2, backgroundColor: 'skyblue', color: 'white' }} 
          >
            회원 정보 수정
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Modify;