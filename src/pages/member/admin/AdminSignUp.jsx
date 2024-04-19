/* eslint-disable */
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
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

function AdminSignUp() {
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState(''); // 비밀번호 확인 필드 추가
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [a_m_oper_yn, setA_m_oper_yn] = useState('');
  const [a_m_br_yn, setA_m_br_yn] = useState('');
  const [a_m_ar_yn, setA_m_ar_yn] = useState('');

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

  const createAccountConfirm = (e) => {
    e.preventDefault();

    let data = {};

    // 이메일, 연락처 유효성 검사 확인 후
    if (regExpEmail.test(mail) && patternPhone.test(phone)) {
      data = {
        "mail": mail,
        "pw": pw,
        "name": name,
        "phone": phone,
        "a_m_oper_yn": a_m_oper_yn,
        "a_m_br_yn": a_m_br_yn,
        "a_m_ar_yn": a_m_ar_yn,
      }

      

      axios.post("/api/admin/member/signUp", JSON.stringify(data), config,)
        .then((response) => {
          if (response.data === "MemberAdminDup") {
            //이메일 중복 실패 
            alert("사용중인 이메일입니다.");

          } else if (response.data === "MemberAdminSignUpSuccess") { 
            //성공 
            navigate('/admin/member/signIn');

          } else if (response.data === "MemberAdminSignUpFail") {
            //DB 에러
            alert("통신 에러 다시 시도해주세요.");

          } else {
            //실패 
            alert("통신 에러 다시 시도해주세요.");

          }
        }).catch((error) => {
          // 실패

        });
    } else if (!regExpEmail.test(mail)) {
      alert("메일 형식이 틀립니다.");

    } else if (!patternPhone.test(phone)) {
      alert("연락처 형식이 틀립니다.");

    }

  };

  const [selectedValue, setSelectedValue] = React.useState('a');

  const navigate = useNavigate();

  return (
    <Container component="main" maxWidth="xs" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
      <Paper elevation={3} sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1">
          관리자 회원가입
        </Typography>
        <form onSubmit={(e) => createAccountConfirm(e)} name='create_account_form' style={{ width: '100%', marginTop: 1 }}>
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
          {!pwCheck && <Alert severity="error">비밀번호가 일치하지 않습니다.</Alert>} 
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
            id="phone"
            label="연락처"
            name="phone"
            // value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormControl>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ ml: '1rem' }}>현재 숙박 운영 여부</FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup id='a_m_oper_yn' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel required control={<Radio name='a_m_oper_yn' value="Y" onChange={(e) => setA_m_oper_yn(e.target.value)} />} label="네" />
                  <FormControlLabel required control={<Radio name='a_m_oper_yn' value="N" onChange={(e) => setA_m_oper_yn(e.target.value)} />} label="아니오" />
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ ml: '1rem' }}>사업자 등록증 여부</FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup id='a_m_br_yn' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" sx={{ ml: '4px' }}>
                  <FormControlLabel required control={<Radio name='a_m_br_yn' value="Y" onChange={(e) => setA_m_br_yn(e.target.value)} />} label="네" />
                  <FormControlLabel required control={<Radio name='a_m_br_yn' value="N" onChange={(e) => setA_m_br_yn(e.target.value)} />} label="아니오" />
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ ml: '1rem' }}>숙박업 등록증 여부</FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup id='a_m_ar_yn' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" sx={{ ml: '4px' }}>
                  <FormControlLabel required control={<Radio name='a_m_ar_yn' value="Y" onChange={(e) => setA_m_ar_yn(e.target.value)} />} label="네" />
                  <FormControlLabel required control={<Radio name='a_m_ar_yn' value="N" onChange={(e) => setA_m_ar_yn(e.target.value)} />} label="아니오" />
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: 'black' } }} 
          >
            회원가입
          </Button>
        </form>
        <Link to="/admin/member/signIn" style={linkStyle}>이미 계정이 있으신가요? 로그인</Link>
      </Paper>
    </Container>
  );
}

export default AdminSignUp;