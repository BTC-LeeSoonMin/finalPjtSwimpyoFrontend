import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from 'react-router-dom';

function AdminModify() {
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState(''); // 비밀번호 확인 필드 추가
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

  const temp = {
    "name" : '순민94',
    "phone" : '010-1230-4560',
    "pw" : 'tnsals94',
    "email" : '순민94@네이버닷컴',
  };

  const patternPhone = /01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/;

  const createAccountConfirm = () => {
    console.log("click SignUp");
    console.log("name : ", name);
    console.log("phone : ", phone);

    let data = {};

    // 비밀번호가 일치하는 경우에만 요청을 보냄 
    if (patternPhone.test(phone)) {
      data = {
        "name": name,
        "phone": phone,
      }

      axios.post("/api/member/admin/modify", JSON.stringify(data), config,)
        .then((response) => {
          console.log(response.data)
          if (response.data === 2) {
            console.log('사용중인 아이디입니다.');

          } else if (response.data === 1) {
            //성공
            console.log('성공');
            navigate('/admin');
            //메인 페이지로 가도록 경로 변경하기

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

  const [selectedValue, setSelectedValue] = React.useState('a');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          관리자 정보 수정
        </Typography>
        <form onSubmit={createAccountConfirm} name='create_account_form' style={{ width: '100%', marginTop: 1 }}>
          <TextField
            label="Filled" variant="filled"
            margin="normal"
            fullWidth
            id="mail"
            name="mail"
            autoComplete="email"
            value={temp.email}
            disabled
          />
          <TextField
            label="Filled" variant="filled"
            margin="normal"
            name="pw"
            type="password"
            id="password"
            autoComplete="new-password"
            value={temp.pw}
            disabled
          /><Button
          variant="contained"
          href='/admin'
          sx={{ ml: 2, mt: 3, backgroundColor: 'black', color: 'white' }} // 검정색 배경, 흰색 글자색
        >
          비밀번호 수정
        </Button>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            name="name"
            value={temp.name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            name="phone"
            value={temp.phone}
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

export default AdminModify;