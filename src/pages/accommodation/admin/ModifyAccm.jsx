import React, { useEffect, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, List, ListItem, ListItemText, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import PostcodeComponent from '../../../components/PostCodeComponent';

const ModifyAccm = () => {

    const { no } = useParams();

    const [formData, setFormData] = useState({
        a_acc_name: '',
        a_acc_intro: '',
        a_acc_kind: '',
        a_acc_bn: '',
        a_m_no: '',
        a_m_email: '',
        a_acc_address: {
            areaAddress: '',
            detailAddress: ''
        },
        a_acc_phone: '',
        a_acc_image: []

    });

    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [selectedFileURLs, setSelectedFileURLs] = useState([]); // 이미지 URL을 저장할 상태 추가

    const [editorData, setEditorData] = useState("");

    const editorConfiguration = {

    }

    const fileInputRef = useRef();


    // const [selectedAddress, setSelectedAddress] = useState({
    //     areaAddress: '',
    //     detailAddress: ''

    // });

    const navigate = useNavigate();

    useEffect(() => {
        console.log(formData.a_acc_image);
    }, [formData.a_acc_image]);

    useEffect(() => {
        // name 파라미터를 이용하여 데이터를 불러오고 formData를 업데이트
        async function fetchData(no) {
            try {
                // 서버에서 데이터를 가져올 엔드포인트 URL을 설정
                const apiUrl = `/api/admin/accm/show_accm_detail?a_m_no=${formData.a_m_no}`;

                // Axios를 사용하여 데이터 가져오기
                const response = await axios.get(apiUrl);

                if (response.status === 200) {
                    return response.data; // 서버에서 반환한 데이터를 반환
                } else {
                    throw new Error('데이터를 가져오는 중 에러 발생');
                }
            } catch (error) {
                throw error;
            }
        }

        // 예를 들어, `fetchData` 함수로 데이터를 가져온다고 가정
        fetchData(no)
            .then((data) => {
                setFormData({
                    a_acc_name: data.a_acc_name,
                    a_acc_intro: data.a_acc_intro,
                    a_acc_kind: data.a_acc_kind,
                    a_acc_bn: data.a_acc_bn,
                    a_m_no: data.a_m_no,
                    a_m_email: data.a_m_email,
                    a_acc_address: {
                        areaAddress: data.a_acc_address,
                        detailAddress: '', // 상세 주소 초기화
                    },
                    a_acc_phone: data.a_acc_phone,
                    a_acc_image: data.a_acc_image,
                });

                // 이 외의 필드 데이터도 필요에 따라 설정
            })
            .catch((error) => {
                console.error('데이터를 불러오는 중 에러 발생', error);
            });
    }, [no]);

    const uploadProfile = (e) => {
        const files = Array.from(e.target.files);
        setFormData(prevState => ({
            ...prevState,
            a_acc_image: [...prevState.a_acc_image, ...files]
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
    };


    const handleRemoveImage = (keyToRemove) => {
        // 선택된 이미지를 제거합니다.
        const indexToRemove = selectedFileNames.findIndex(fileName => fileName.key === keyToRemove);

        const updatedImages = formData.a_acc_image.filter((_, index) => index !== indexToRemove);
        setFormData(prevState => ({
            ...prevState,
            a_acc_image: updatedImages
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 이미지 때문에 formData를 백엔드로 전송해야 한다.
        const data = new FormData();

        for (const key in formData) {
            if (key === "a_acc_image") {
                formData[key].forEach((file) => {
                    data.append("a_acc_image", file);
                });
            } else if (key === "a_acc_address") { // a_acc_address 객체를 처리하는 부분
                data.append("a_acc_address", formData[key].areaAddress + formData[key].detailAddress);
            } else {
                data.append(key, formData[key]);
            }
        }

        // adminAccmDto 객체에 모든 데이터를 담아서 보내기
        data.append("adminAccmDto", JSON.stringify({
            a_acc_name: formData.a_acc_name,
            a_acc_intro: formData.a_acc_intro,
            a_acc_kind: formData.a_acc_kind,
            a_acc_bn: formData.a_acc_bn,
            a_m_no: formData.a_m_no,
            a_m_email: formData.a_m_email,
            a_acc_address: formData.a_acc_address.areaAddress + " " + formData.a_acc_address.detailAddress,
            a_acc_phone: formData.a_acc_phone
        }));

        try {
            const response = await axios.post("/api/admin/accm/modify_confirm",
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);  // "success" 출력

            if (response.data === "success") {
                navigate('/Create_account_success');
                navigate('/miniBoard/Create_account_success');
            }

        } catch (error) {
            console.error("등록실패:", error);
        }
    };

    const handlerAddressSelected = (data) => {
        setFormData(prevState => ({
            ...prevState,
            a_acc_address: {
                areaAddress: data.areaAddress,
                detailAddress: data.detailAddress
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
                    <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
                        숙박 업소 수정
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

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
                        />

                        <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadProfile} multiple="multiple" style={{ display: 'none' }} id="fileInput" />
                        <label htmlFor="fileInput">
                            <Button variant="contained" color="primary" component="span">
                                이미지 업로드
                            </Button>
                        </label>
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
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />

                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel htmlFor="a_acc_kind">숙박업소 종류</InputLabel>
                            <Select
                                label="숙박업소 종류"
                                id="a_acc_kind"
                                value={formData.a_acc_kind}
                                onChange={(e) => setFormData({ ...formData, a_acc_kind: e.target.value })}
                            >
                                <MenuItem value={"호텔/리조트"}>호텔/리조트</MenuItem>
                                <MenuItem value={"펜션/풀빌라"}>펜션/풀빌라</MenuItem>
                                <MenuItem value={"모텔"}>모텔</MenuItem>
                                <MenuItem value={"캠핑/글램핑"}>캠핑/글램핑</MenuItem>
                                <MenuItem value={"게스트하우스"}>게스트하우스</MenuItem>
                            </Select>
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
                            value={formData.a_acc_address.areaAddress + formData.a_acc_address.detailAddress}
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
            </Paper>
        </Container>
    );

}

export default ModifyAccm;