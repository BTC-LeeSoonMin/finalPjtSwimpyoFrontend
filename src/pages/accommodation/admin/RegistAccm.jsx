import React, { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, List, ListItem, ListItemText, Paper, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import PostcodeComponent from '../../../components/PostCodeComponent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { applyMiddleware } from '@reduxjs/toolkit';
import api from '../../../hooks/RefreshTokenAuto';


const RegistAccm = () => {

    const [formData, setFormData] = useState({
        a_acc_name: '',
        a_acc_intro: '',
        a_acc_kind: '',
        a_acc_bn: '',
        a_m_no: '',
        a_m_email: '',
        a_acc_address: {
            combinedAddress: ''
        },
        a_acc_phone: '',
        a_i_image: []
    });

    const [fieldErrors, setFieldErrors] = useState({
        a_acc_name: false,
        a_acc_intro: false,
        a_acc_kind: false,
        // 필요한 나머지 필드들도 여기에 추가
    });

    // 파일 업로드를 위한 상태
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [selectedFileURLs, setSelectedFileURLs] = useState([]); // 이미지 URL을 저장할 상태 추가
    const fileInputRef = useRef(null);
    const errorMessageRef = useRef(null);
    // 파일 업로드를 위한 상태

    // 이미지 파일 업로드 하지 않고 등록 시 에러 메시지 띄우기 위한 상태 시작
    const [imageError, setImageError] = useState(false);
    // 이미지 파일 업로드 하지 않고 등록 시 에러 메시지 띄우기 위한 상태 끝

    const [editorData, setEditorData] = useState("");

    const editorConfiguration = {

    }

    const navigate = useNavigate();

    useEffect(() => {
        console.log(formData.a_i_image);
    }, [formData.a_i_image]);


    const uploadProfile = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevState => ({
            ...prevState,
            a_i_image: [...prevState.a_i_image, ...files]
        }));
        // 선택된 파일의 이름들을 보여주는 코드 추가
        const fileNames = files.map(file => (
            <ListItem key={file.name + Date.now()}>
                <ListItemText primary={file.name} />
            </ListItem>
        ));
        setSelectedFileNames(prevFileNames => [...prevFileNames, ...fileNames]); // React의 state를 사용하여 파일 이름을 저장

        const fileURLs = files.map(file => URL.createObjectURL(file)); // 이미지 URL 생성
        setSelectedFileURLs(prevURLs => [...prevURLs, ...fileURLs]); // 이미지 URL 상태에 저장

        e.target.value = null;

        // 이미지 에러 글을 지우기 위해 상태변화를 false를 준다.
        if (e.target.files.length >= 0) {
            setImageError(false);
        }
        // 이미지 에러 글을 지우기 위해 상태변화를 false를 준다.
    };


    const handleRemoveImage = (keyToRemove) => {
        // 선택된 이미지를 제거합니다.
        const indexToRemove = selectedFileNames.findIndex(fileName => fileName.key === keyToRemove);

        const updatedImages = formData.a_i_image.filter((_, index) => index !== indexToRemove);
        setFormData(prevState => ({
            ...prevState,
            a_i_image: updatedImages
        }));

        // 선택된 파일 이름 목록에서 해당 항목을 제거합니다.
        const updatedFileNames = selectedFileNames.filter(fileName => fileName.key !== keyToRemove);
        setSelectedFileNames(updatedFileNames);

        // 선택된 파일 URL 목록에서 해당 항목을 제거합니다.
        const updatedFileURLs = selectedFileURLs.filter((_, index) => index !== indexToRemove);
        setSelectedFileURLs(updatedFileURLs);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // 에러 필드를 나타내기 위한 코드 //
        if (value === '') {
            setFieldErrors({
                ...fieldErrors,
                [name]: true
            });
        } else {
            setFieldErrors({
                ...fieldErrors,
                [name]: false
            });
        }
        // 에러 필드를 나타내기 위한 코드 //

    };


    const fetchData = async () => {
        try {
            const response = await api.post(`/api/admin/member/adminInfo`,
                {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    }
                }
            );

            if (response.status === 200) {
                console.log("detail data success");
                console.log("reponse.data", response.data);
                // console.log("reponse.data", response.data);
                setFormData(
                    prevFormData => ({
                        ...prevFormData,
                        a_m_no: response.data.a_m_no,
                        a_m_email: response.data.a_m_email,
                        a_acc_phone: response.data.a_m_phone
                    }));
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    console.log("setFormData", formData);

    useEffect(() => {
        fetchData(); // 비동기 함수 호출
    }, [])


    const registAccmConfirm = async (e) => {
        e.preventDefault();

        // 이미지 때문에 formData를 백엔드로 전송해야 한다.
        const data = new FormData();

        // 에러 메시지 띄우기 위한 변수 시작 //
        let allFieldsValid = true;
        const newErrors = {};
        // 에러 메시지 띄우기 위한 변수 끝 //

        for (const key in formData) {
            if (key === "a_i_image") {
                formData[key].forEach((file) => {
                    data.append("a_i_image", file);
                });
            } else if (key === "a_acc_address") { // a_acc_address 객체를 처리하는 부분
                data.append("a_acc_address", formData[key].combinedAddress);
            } else {
                data.append(key, formData[key]);
            }
        }

        // 이미지 업로드 에러 메시지 시작
        if (!selectedFileNames.length) {
            setImageError(true);
            console.log("이미지 업로드 필요");
            errorMessageRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            return;
        }
        else {
            setImageError(false);
        }
        // 이미지 업로드 에러 메시지 끝

        // 에러 메시지 띄우기 위한 로직 시작
        for (const field in fieldErrors) {
            if (formData[field] === '') {
                newErrors[field] = true;
                allFieldsValid = false;
                errorMessageRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }

        setFieldErrors(newErrors);

        if (!allFieldsValid) return;
        // 에러 메시지 띄우기 위한 로직 끝


        // adminAccmDto 객체에 모든 데이터를 담아서 보내기
        const jsonBlob = new Blob([JSON.stringify({
            a_acc_name: formData.a_acc_name,
            a_acc_intro: formData.a_acc_intro,
            a_acc_kind: formData.a_acc_kind,
            a_acc_bn: formData.a_acc_bn,
            a_m_no: formData.a_m_no,
            a_m_email: formData.a_m_email,
            a_acc_address: formData.a_acc_address.combinedAddress,
            a_acc_phone: formData.a_acc_phone
        })], { type: "application/json" });

        data.append("adminAccmDto", jsonBlob);

        try {
            const response = await api.post("/api/admin/accm/regist_confirm",
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);  // "success" 출력
            alert("숙박업소가 등록되었습니다 등록된 숙박업소의 상세페이지로 이동됩니다");
            navigate(`/admin/accommodation/detailAccm/${formData.a_m_no}`);
        } catch (error) {
            console.error("등록실패:", error);
        }
    };


    const handlerAddressSelected = (data) => {
        setFormData(prevState => ({
            ...prevState,
            a_acc_address: {
                combinedAddress: data.combinedAddress
            }
        }));


    };


    return (
        <Container component="main" maxWidth="md" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
            <Paper elevation={3} sx={{ width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ mt: 3, fontWeight: "bold" }}>
                        숙박 업소 등록
                    </Typography>

                    <form onSubmit={registAccmConfirm} name='regist_accm_confirm' style={{ width: '100%', marginTop: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_acc_name"
                            label="업소명"
                            name="a_acc_name"
                            autoComplete="a_acc_name"
                            autoFocus
                            value={formData.a_acc_name}
                            onChange={handleChange}
                            helperText={fieldErrors.a_acc_name ? "이 입력란을 작성하세요." : ""}
                            error={fieldErrors.a_acc_name}
                        />

                        <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadProfile} multiple="multiple" style={{ display: 'none' }} id="fileInput" />
                        <label htmlFor="fileInput">
                            <Button variant="contained" color="primary" sx={{
                                mt: 2, mr: 2, width: 'auto', backgroundColor: "black",
                                borderColor: 'white',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                },
                            }} component="span" startIcon={<CloudUploadIcon />}>
                                이미지 업로드
                            </Button>
                        </label>
                        <p style={{ color: imageError ? 'red' : 'transparent' }} ref={errorMessageRef}>
                            {imageError ? "이미지를 업로드해주세요." : ""}
                        </p>
                        <List>
                            {selectedFileNames.map((fileName, index) => (
                                <ListItem key={fileName.key}>
                                    <ListItemText primary={fileName.props.children.props.primary} />
                                    <img src={selectedFileURLs[index]} alt={fileName.props.children.props.primary} style={{ width: '50px', height: '50px', marginLeft: '10px' }} /> {/* 이미지 미리보기 추가 */}
                                    <Button onClick={() => handleRemoveImage(fileName.key)} style={{ marginLeft: '10px' }}>X</Button>
                                </ListItem>
                            ))}
                        </List>


                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.a_acc_intro}
                            config={editorConfiguration}
                            placeholder="내용을 입력하세요"
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                // setEditorData(data);
                                setFormData(prevState => ({
                                    ...prevState,
                                    a_acc_intro: data
                                }));
                                // CKeditor에 글을 적으면 에러메시지 제거
                                if (data === '') {
                                    setFieldErrors(prevErrors => ({
                                        ...prevErrors,
                                        a_acc_intro: true
                                    }));
                                } else {
                                    setFieldErrors(prevErrors => ({
                                        ...prevErrors,
                                        a_acc_intro: false
                                    }));
                                }
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                        {fieldErrors.a_acc_intro && <p style={{ color: 'red' }}>숙박업소 정보를 입력하세요.</p>}

                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="a_acc_kind">숙박업소 종류</InputLabel>
                            <Select
                                label="숙박업소 종류"
                                id="a_acc_kind"
                                value={formData.a_acc_kind}
                                onChange={(e) => {
                                    setFormData({ ...formData, a_acc_kind: e.target.value });
                                    if (e.target.value === '') {
                                        setFieldErrors(prevErrors => ({
                                            ...prevErrors,
                                            a_acc_kind: true
                                        }));
                                    } else {
                                        setFieldErrors(prevErrors => ({
                                            ...prevErrors,
                                            a_acc_kind: false
                                        }));
                                    }
                                }}
                            >
                                <MenuItem value={"호텔/리조트"}>호텔/리조트</MenuItem>
                                <MenuItem value={"펜션/풀빌라"}>펜션/풀빌라</MenuItem>
                                <MenuItem value={"모텔"}>모텔</MenuItem>
                                <MenuItem value={"캠핑/글램핑"}>캠핑/글램핑</MenuItem>
                                <MenuItem value={"게스트하우스"}>게스트하우스</MenuItem>
                            </Select>
                            {fieldErrors.a_acc_kind && <FormHelperText error>숙박업소 종류를 선택하세요.</FormHelperText>}
                        </FormControl>

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_acc_bn"
                            label="사업자 번호"
                            name="a_acc_bn"
                            autoComplete="a_acc_bn"
                            autoFocus
                            value={formData.a_acc_bn}
                            onChange={handleChange}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_m_no"
                            label="관리자 번호"
                            name="a_m_no"
                            autoComplete="a_m_no"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: "#e0e0e0" },
                            }}
                            value={formData.a_m_no}
                            onChange={handleChange}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_m_email"
                            label="이메일"
                            name="a_m_email"
                            autoComplete="a_m_email"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: "#e0e0e0" },
                            }}
                            value={formData.a_m_email}
                            onChange={handleChange}
                        />

                        {/* <TextField
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
                        /> */}

                        <PostcodeComponent setAddressObj={handlerAddressSelected} />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="selected_address"
                            label="일반 주소"
                            name="selected_address"
                            autoComplete="selected_address"
                            autoFocus
                            // value={formData.a_acc_address.areaAddress + formData.a_acc_address.detailAddress}
                            value={formData.a_acc_address.combinedAddress}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />


                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_acc_phone"
                            label="연락처"
                            name="a_acc_phone"
                            autoComplete="a_acc_phone"
                            autoFocus
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: "#e0e0e0" },
                            }}
                            value={formData.a_acc_phone}
                            onChange={handleChange}
                        />

                        {/* <TextField
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
                        /> */}

                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 3 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 3, mb: 2, mr: 2, backgroundColor: "black",
                                    borderColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    },
                                }}
                            // disabled={!setSelectedFileNames[0]}
                            >
                                등록
                            </Button>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{
                                    mt: 3, mb: 2, backgroundColor: "black",
                                    borderColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    },
                                }}
                                onClick={() => navigate(-1)}
                            >
                                취소
                            </Button>
                        </Box>
                    </form>
                </Box>

                {/* </Box> */}

            </Paper >
        </Container >

    );


}

export default RegistAccm;