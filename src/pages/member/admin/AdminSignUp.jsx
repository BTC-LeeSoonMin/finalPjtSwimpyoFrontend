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

  const createAccountConfirm = () => {
    console.log("click SignUp");
    console.log("mail : ", mail);
    console.log("PW : ", pw);
    console.log("pwConfirm : ", pwConfirm);
    console.log("name : ", name);
    console.log("phone : ", phone);
    console.log("a_m_oper_yn : ", a_m_oper_yn);
    console.log("a_m_br_yn : ", a_m_br_yn);
    console.log("a_m_ar_yn : ", a_m_ar_yn);

    let data = {};

    // 비밀번호가 일치하는 경우에만 요청을 보냄 
    if (pwCheck) {
      data = {
        "mail": mail,
        "pw": pw,
        "name": name,
        "phone": phone, 
        "a_m_oper_yn" : a_m_oper_yn, 
        "a_m_br_yn" : a_m_br_yn, 
        "a_m_ar_yn" : a_m_ar_yn, 
      }
      
      axios.post("/api/member/admin/signup", JSON.stringify(data), config, )
      .then((response) => {
        console.log(response.data)
        if(response.data === 2 ){
          console.log('사용중인 아이디입니다.');
          
        } else if(response.data === 1) {
          //성공
          console.log('성공');
          navigate('/member/admin/signin');
          //로그인 페이지로 가도록 경로 변경하기

        }else {
          console.log('fail');


        }
      }).catch((error) => {
        // 실패

      });
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
          관리자 회원가입 요청
        </Typography>
        <form onSubmit={createAccountConfirm} name='create_account_form' style={{ width: '100%', marginTop: 1 }}>
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
            id="phone"
            label="연락처"
            name="phone"
            // value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormControl>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ml: '2rem'}}>현재 숙박 운영 여부</FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup id='a_m_oper_yn' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                  <FormControlLabel control={<Radio name='a_m_oper_yn' value="Y" onChange={(e) => setA_m_oper_yn(e.target.value)}/>} label="네" />
                  <FormControlLabel control={<Radio name='a_m_oper_yn' value="N" onChange={(e) => setA_m_oper_yn(e.target.value)}/>} label="아니오"/>
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ml: '2rem'}}>사업자 등록증 여부</FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup id='a_m_br_yn' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" sx={{ml: '4px'}}>
                  <FormControlLabel control={<Radio name='a_m_br_yn' value="Y" onChange={(e) => setA_m_br_yn(e.target.value)}/>} label="네" />
                  <FormControlLabel control={<Radio name='a_m_br_yn' value="N" onChange={(e) => setA_m_br_yn(e.target.value)}/>} label="아니오"/>
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ml: '2rem'}}>숙박업 등록증 여부</FormLabel>
              </Grid>
              <Grid item>
                <RadioGroup id='a_m_ar_yn' row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" sx={{ml: '4px'}}>
                  <FormControlLabel control={<Radio name='a_m_ar_yn' value="Y" onChange={(e) => setA_m_ar_yn(e.target.value)}/>} label="네" />
                  <FormControlLabel control={<Radio name='a_m_ar_yn' value="N" onChange={(e) => setA_m_ar_yn(e.target.value)}/>} label="아니오"/>
                </RadioGroup>
              </Grid>
            </Grid>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2, backgroundColor: 'black', color: 'white' }} // 검정색 배경, 흰색 글자색
          >
            회원가입 요청
          </Button>
        </form>
        <a href="/member/admin/signIn" style={linkStyle}>이미 계정이 있으신가요? 로그인</a>
      </Paper>
    </Container>
  );
}

export default AdminSignUp;