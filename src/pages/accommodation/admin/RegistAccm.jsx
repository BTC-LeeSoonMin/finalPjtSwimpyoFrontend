
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import PostcodeComponent from '../../../components/PostCodeComponent';

const RegistAccm = () => {

    const [formData, setFormData] = useState({



    });

    const [selectedAddress, setSelectedAddress] = useState({
        areaAddress: '',
        detailAddress: ''

    });

    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8090/member/createAccountForm", formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);  // "success" 출력

            if (response.data === "success") {
                navigate('/Create_account_success');
                navigate('/miniBoard/Create_account_success');
            }

        } catch (error) {
            console.error("회원가입 실패:", error);
        }
    };

    const handlerAddressSelected = (data) => {
        setSelectedAddress(data);
    };



    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                    숙박 업소 등록
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="m_id"
                        label="업소명"
                        name="m_id"
                        autoComplete="m_id"
                        autoFocus
                        value={formData.m_id}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="m_id"
                        label="사업자 번호"
                        name="m_id"
                        autoComplete="m_id"
                        autoFocus
                        value={formData.m_id}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="m_id"
                        label="대표자 명"
                        name="m_id"
                        autoComplete="m_id"
                        autoFocus
                        value={formData.m_id}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="selected_address"
                        label="일반주소"
                        name="selected_address"
                        autoComplete="selected_address"
                        autoFocus
                        value={selectedAddress.areaAddress}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="detail_address"
                        label="상세주소"
                        name="detail_address"
                        autoComplete="detail_address"
                        autoFocus
                        value={selectedAddress.detailAddress}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                    />

                    <PostcodeComponent setAddressObj={handlerAddressSelected} />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="m_id"
                        label="연락처"
                        name="m_id"
                        autoComplete="m_id"
                        autoFocus
                        value={formData.m_id}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="m_id"
                        label="이메일"
                        name="m_id"
                        autoComplete="m_id"
                        autoFocus
                        value={formData.m_id}
                        onChange={handleChange}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="m_mail"
                        label="Email"
                        type="email"
                        id="m_mail"
                        autoComplete="m_mail"
                        value={formData.m_mail}
                        onChange={handleChange}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 3 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2, mr: 2 }}
                        >
                            등록
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            취소
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>

    );


}

export default RegistAccm;