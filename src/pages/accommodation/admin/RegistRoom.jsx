import React, { useState, useRef } from 'react';
import { Button, TextField, Container, Typography, Box, List, ListItem, ListItemText, Paper, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const RegistRoom = () => {


    const [a_acc_no, setA_acc_no] = useState(''); // 숙박시설 번호
    const [a_r_name, setA_r_name] = useState(''); // 방이름
    const [a_r_state, setA_r_state] = useState(''); // 숙박 대실
    const [a_r_price, setA_r_price] = useState(''); // 방 가격
    const [a_r_check_in, setA_r_check_in] = React.useState(new Date().setHours(14, 0)); // 체크인 시간 상태
    const [a_r_check_out, setA_r_check_out] = React.useState(new Date().setHours(11, 0)); // 체크아웃 시간 상태
    const [a_r_count, setA_r_count] = useState(''); // 방 개수
    const [a_r_content, setA_r_content] = useState(''); // 방 안내 설명
    const [a_r_image, setA_r_image] = useState([]); // 방 이미지

    const [fieldErrors, setFieldErrors] = useState({
        a_r_state: false,
        a_r_check_in: false,
        a_r_check_out: false
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


    const navigate = useNavigate();


    // 체크인 시간 상태 변화
    const handleCheckInTimeChange = (time) => {
        setA_r_check_in(time);
    };

    // 체크아웃 시간 상태 변화
    const handleCheckOutTimeChange = (time) => {
        setA_r_check_out(time);
    };

    const uploadProfile = (e) => {
        const files = Array.from(e.target.files);
        setA_r_image(prevImages => [...prevImages, ...files]);
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

        setA_r_image(prevImages => prevImages.filter((_, index) => index !== indexToRemove));

        // 선택된 파일 이름 목록에서 해당 항목을 제거합니다.
        const updatedFileNames = selectedFileNames.filter(fileName => fileName.key !== keyToRemove);
        setSelectedFileNames(updatedFileNames);

        // 선택된 파일 URL 목록에서 해당 항목을 제거합니다.
        const updatedFileURLs = selectedFileURLs.filter((_, index) => index !== indexToRemove);
        setSelectedFileURLs(updatedFileURLs);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'a_acc_no':
                setA_acc_no(value);
                break;
            case 'a_r_name':
                setA_r_name(value);
                break;
            case 'a_r_state':
                setA_r_state(value);
                break;
            case 'a_r_price':
                setA_r_price(value);
                break;
            case 'a_r_check_in':
                setA_r_check_in(value);
                break;
            case 'a_r_check_out':
                setA_r_check_out(value);
                break;
            case 'a_r_count':
                setA_r_count(value);
                break;
            case 'a_r_content':
                setA_r_content(value);
                break;
            // 이미지 핸들링은 별도로 처리해야 합니다.
            default:
                break;
        }

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






    const registRoomConfirm = async (e) => {
        e.preventDefault();

        // 이미지 때문에 formData를 백엔드로 전송해야 한다.
        const data = new FormData();

        // 에러 메시지 띄우기 위한 변수 시작 //
        let allFieldsValid = true;
        const newErrors = {};
        // 에러 메시지 띄우기 위한 변수 끝 //

        // for (const key in formData) {
        //     if (key === "a_r_image") {
        //         formData[key].forEach((file) => {
        //             data.append("a_r_image", file);
        //         });
        //     }

        for (let i = 0; i < a_r_image.length; i++) {
            data.append('a_r_image', a_r_image[i]);
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


        // if (selectedFileNames.length === 0) {
        //     alert("이미지를 업로드 해주세요");
        //     return;
        // }

        // adminAccmDto 객체에 모든 데이터를 담아서 보내기
        const jsonBlob = new Blob([JSON.stringify({
            a_acc_no: a_acc_no,
            a_r_name: a_r_name,
        })], { type: "application/json" });

        data.append("adminAccmDto", jsonBlob);

        try {
            const response = await axios.post("/api/admin/accm/regist_confirm",
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);  // "success" 출력
            alert("해당 객실이 등록되었습니다 숙박업소 상세 페이지로 이동됩니다");
            navigate('/admin/accommodation/detailAccm');

        } catch (error) {
            console.error("등록실패:", error);
        }
    }



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
                        방 등록
                    </Typography>

                    <form onSubmit={registRoomConfirm} name='regist_room_confirm' style={{ width: '100%', marginTop: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_acc_no"
                            label="숙박시설 번호"
                            name="a_acc_no"
                            autoComplete="a_acc_no"
                            autoFocus
                            value={a_acc_no}
                            onChange={handleChange}
                        // helperText={fieldErrors.a_r_name ? "이 입력란을 작성하세요." : ""}
                        // error={a_r_name}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_r_name"
                            label="방 이름"
                            name="a_r_name"
                            autoComplete="a_r_name"
                            autoFocus
                            value={a_r_name}
                            onChange={handleChange}
                        // helperText={fieldErrors.a_r_name ? "이 입력란을 작성하세요." : ""}
                        // error={a_r_name}
                        />


                        <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadProfile} multiple="multiple" style={{ display: 'none' }} id="fileInput" />
                        <label htmlFor="fileInput">
                            <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
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


                        <FormControl sx={{ mt: 3 }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">숙박/대실</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="a_r_state"
                                value={a_r_state}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="숙박" control={<Radio />} label="숙박" />
                                <FormControlLabel value="대실" control={<Radio />} label="대실" />
                            </RadioGroup>
                        </FormControl>


                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_r_count"
                            label="룸 개수"
                            name="a_r_count"
                            type="number"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">개</InputAdornment>,
                                inputProps: {
                                    min: 0 // 가격은 0 이상이어야 함
                                }
                            }}
                            autoComplete="off"
                            value={a_r_count}
                            onChange={handleChange}
                        // helperText={fieldErrors.price ? "올바른 가격을 입력하세요." : ""}
                        // error={Boolean(fieldErrors.price)} // fieldErrors.price가 존재하면 true로 변환하여 error props에 전달
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_r_price"
                            label="가격"
                            name="a_r_price"
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₩</InputAdornment>,
                                inputProps: {
                                    min: 0 // 가격은 0 이상이어야 함
                                }
                            }}
                            autoComplete="off"
                            value={a_r_price}
                            onChange={handleChange}
                        // helperText={fieldErrors.price ? "올바른 가격을 입력하세요." : ""}
                        // error={Boolean(fieldErrors.price)} // fieldErrors.price가 존재하면 true로 변환하여 error props에 전달
                        />

                        <TextField
                            variant="outlined"
                            name="a_r_content"
                            margin="normal"
                            required
                            fullWidth
                            id="outlined-multiline-static"
                            label="안내 내용 / 설명"
                            multiline
                            value={a_r_content}
                            onChange={handleChange}
                            rows={5} // 기본적으로 보여줄 행의 수
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 3, width: '100%' }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="체크인 시간"
                                    value={a_r_check_in}
                                    onChange={handleCheckInTimeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    minutesStep={60} // 1시간 단위로 변경
                                />
                                <h2>~</h2>

                                <TimePicker
                                    label="체크아웃 시간"
                                    value={a_r_check_out}
                                    onChange={handleCheckOutTimeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                    minutesStep={60} // 1시간 단위로 변경
                                />
                            </LocalizationProvider>

                        </Box>




                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 3 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2, mr: 2 }}
                            // disabled={!setSelectedFileNames[0]}
                            >
                                등록
                            </Button>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => navigate(-1)}
                            >
                                취소
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Paper >
        </Container >

    );
}

export default RegistRoom;