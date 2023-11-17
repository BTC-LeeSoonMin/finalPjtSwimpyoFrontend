import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, Container, Typography, Box, List, ListItem, ListItemText, Paper, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';
import api from '../../../hooks/RefreshTokenAuto';

const ModifyRoom = () => {

    const paramsData = useParams(); // 넘어온 데이터

    const [backEndData, setBackEndData] = useState({}); // 백엔드에서 넘어온 데이터

    const [a_acc_no, setA_acc_no] = useState(''); // 숙박시설 번호
    const [a_m_no, setA_m_no] = useState(''); // 관리자 번호
    const [a_r_name, setA_r_name] = useState(''); // 방이름
    const [a_r_state, setA_r_state] = useState(''); // 숙박 대실
    const [a_r_price, setA_r_price] = useState(''); // 방 가격
    const [a_r_check_in, setA_r_check_in] = React.useState(new Date().setHours(14, 0)); // 체크인 시간 상태
    const [a_r_check_out, setA_r_check_out] = React.useState(new Date().setHours(11, 0)); // 체크아웃 시간 상태
    // const [a_r_count, setA_r_count] = useState(''); // 방 개수
    const [a_r_content, setA_r_content] = useState(''); // 방 안내 설명
    const [r_i_image, setR_i_image] = useState([]); // 방 이미지

    const [fieldErrors, setFieldErrors] = useState({
        a_r_state: false,
        a_r_check_in: false,
        a_r_check_out: false
        // 필요한 나머지 필드들도 여기에 추가
    });

    console.log("params data", paramsData);

    // 파일 업로드를 위한 상태
    const [selectedFileNames, setSelectedFileNames] = useState([]);
    const [selectedFileURLs, setSelectedFileURLs] = useState([]); // 이미지 URL을 저장할 상태 추가
    const fileInputRef = useRef(null);
    const errorMessageRef = useRef(null);
    // 파일 업로드를 위한 상태



    // 삭제한 이미지의 배열을 증가 시킨다.(어떤 이미지를 삭제하는 지 알기위해서)
    const [deleteImage, setDeleteImage] = useState([]);
    // 삭제한 이미지의 배열을 증가 시킨다.(어떤 이미지를 삭제하는 지 알기위해서)


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
        setR_i_image(prevImages => [...prevImages, ...files]);
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
        // 선택된 이미지를 제거
        const indexToRemove = selectedFileNames.findIndex(fileName => fileName.key === keyToRemove);


        // 이미지의 a_i_no 값을 찾음
        const imageNoToRemove = selectedFileNames[indexToRemove]?.key;  // key = a_i_no
        console.log("키 번호", imageNoToRemove);
        console.log("키 번호 타입", typeof (imageNoToRemove));
        console.log("ffffffffffffffffff", Array.isArray(r_i_image));

        // 이미지 고유 번호(a_i_no)를 deleteImage 배열에 추가
        if (!imageNoToRemove.includes('.')) {
            setDeleteImage(prevDeleteImage => [...prevDeleteImage, imageNoToRemove]);
        }
        // 백엔드에서 받아온 이미지 또한 제거
        setR_i_image(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
        //

        // 선택된 파일 이름 목록에서 해당 항목을 제거
        const updatedFileNames = selectedFileNames.filter(fileName => fileName.key !== keyToRemove);
        setSelectedFileNames(updatedFileNames);

        // 선택된 파일 URL 목록에서 해당 항목을 제거
        const updatedFileURLs = selectedFileURLs.filter((_, index) => index !== indexToRemove);
        setSelectedFileURLs(updatedFileURLs);
    };

    console.log("deleteImage", deleteImage);


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
                const onlyNumber = value.replace(/[^0-9]/g, '');
                // 숫자를 포맷하여 상태를 업데이트함
                const pricePerThousand = onlyNumber ? parseInt(onlyNumber, 10).toLocaleString() : '';
                setA_r_price(pricePerThousand);
                break;
            case 'a_r_check_in':
                setA_r_check_in(value);
                break;
            case 'a_r_check_out':
                setA_r_check_out(value);
                break;
            // case 'a_r_count':
            //     setA_r_count(value);
            //     break;
            case 'a_r_content':
                setA_r_content(value);
                break;
            // 이미지 핸들링은 별도로 처리해야 함
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


    const scrollToError = () => {
        // 에러 메시지 띄우기 위한 변수 시작 //
        let allFieldsValid = true;
        const newErrors = {};
        // 에러 메시지 띄우기 위한 변수 끝 //

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

        if (!a_r_state) {
            newErrors['a_r_state'] = 'State is required';
            allFieldsValid = false;
        }
        if (!a_r_check_in) {
            newErrors['a_r_check_in'] = 'Check-in time is required';
            allFieldsValid = false;
        }
        if (!a_r_check_out) {
            newErrors['a_r_check_out'] = 'Check-out time is required';
            allFieldsValid = false;
        }

        setFieldErrors(newErrors);


        if (!allFieldsValid) {
            // 에러가 있는 첫 번째 요소로 스크롤 이동
            const firstErrorField = Object.keys(newErrors)[0];
            const errorElement = document.getElementsByName(firstErrorField)[0];
            if (errorElement) {
                errorElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }


            if (!allFieldsValid) return;
            // 에러 메시지 띄우기 위한 로직 끝
        }

        return allFieldsValid;

    };


    // 들어온 시간 데이터를 다시 타임피커에 나타내기 위해 변환
    const convertTimeToDate = (time) => {
        if (!time) {
            return new Date(); // 현재 시간을 기본값으로 설정
        }

        // 현재 날짜를 기준으로 하지만, 시간만 '14:00'에서 가져옵니다.
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        now.setHours(hours, minutes, 0, 0); // 초와 밀리초는 0으로 설정합니다.

        return now;
    };
    // 들어온 시간 데이터를 다시 타임피커에 나타내기 위해 변환

    // 들어온 금액 데이터를 1000단위로 , 표시하기 위해 변환 디비에는 숫자형이다. 다시 스트링으로 변환
    const convertPrice = (price) => {
        if (!price) {
            return null;
        }

        const priceToString = price.toLocaleString();
        return priceToString;
    }


    const fetchData = async () => {
        try {
            const response = await api.post(`http://localhost:8090/api/admin/room/showRoomDetail?a_r_no=${paramsData.a_r_no}`);
            //  res -> 서버에서 받아온 데이터
            if (response.status === 200) {
                console.log("detail data success");
                // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.
                console.log("확인 : ", response.data);
                setBackEndData(response.data.adminRoomDto);
                console.log("accmData", backEndData);


                setBackEndData({
                    ...response.data.adminRoomDto,
                    r_i_no: [...response.data.r_i_nos],
                    r_i_image: [...response.data.r_i_images]
                });


                // 백엔드에서 받아온 이미지 데이터를 사용하여 미리보기 상태 초기화

                const initialImageURLAndNo = response.data.r_i_images.map((url, index) => ({
                    url,
                    r_i_no: response.data.r_i_nos[index]
                }));
                setSelectedFileURLs(initialImageURLAndNo.map(item => item.url));



                // 이미지가 배열이기 때문에 배열을 풀어서 해결해준다.
                const initialFileName = initialImageURLAndNo.map(item => (
                    <ListItem key={item.r_i_no}>
                        <ListItemText primary={item.url.split('/').pop()} />
                    </ListItem>
                ));
                setSelectedFileNames(initialFileName);
                // 백엔드에서 받아온 이미지 데이터를 사용하여 미리보기 상태 초기화

            } else {
                console.error("Server responded with status:", response.status);
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        fetchData(); // 비동기 함수 호출
    }, [paramsData]);


    useEffect(() => {
        if (backEndData) {
            setA_r_name(backEndData.a_r_name || '');
            setA_r_state(backEndData.a_r_state || '');
            setA_r_price(convertPrice(backEndData.a_r_price) || '');
            setA_r_check_in(convertTimeToDate(backEndData.a_r_check_in) || '');
            setA_r_check_out(convertTimeToDate(backEndData.a_r_check_out) || '');
            // setA_r_count(backEndData.a_r_count || '');
            setA_r_content(backEndData.a_r_content || '');
            setR_i_image(backEndData.r_i_image || null);
        }
    }, [backEndData]);


    console.log("체크인 시간 ", a_r_check_in);
    console.log("체크아웃 시간 ", a_r_check_out);


    const modifyRoomConfirm = async (e) => {
        e.preventDefault();

        // 이미지 때문에 formData를 백엔드로 전송해야 한다.
        const data = new FormData();

        // 타임피커 시간 형태를 바꿔서 사용 (ex : 14:00)
        const formattedCheckInTime = format(a_r_check_in, 'HH:mm');
        const formattedCheckOutTime = format(a_r_check_out, 'HH:mm');


        for (let i = 0; i < r_i_image.length; i++) {
            data.append('r_i_image', r_i_image[i]);
        }

        if (deleteImage.length > 0) {
            data.append("deleteNo", deleteImage);

        }
        console.log("deleteNo", data.deleteImageBlob);


        scrollToError();

        const jsonBlob = new Blob([JSON.stringify({
            a_acc_no: backEndData.a_acc_no,
            a_m_no: backEndData.a_m_no,
            a_r_no: paramsData.a_r_no,
            a_r_name: a_r_name,
            a_r_state: a_r_state,
            a_r_price: parseInt(a_r_price.replace(/,/g, ''), 10),
            a_r_check_in: formattedCheckInTime,
            a_r_check_out: formattedCheckOutTime,
            // a_r_count: a_r_count,
            a_r_content: a_r_content,
        })], { type: "application/json" });

        data.append("adminRoomDto", jsonBlob);

        try {
            const response = await api.post("/api/admin/room/modifyConfirm",
                data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);  // "success" 출력
            alert("해당 객실이 수정되었습니다 룸 상세 페이지로 이동됩니다");
            navigate(`/admin/accommodation/detailRoom/${paramsData.a_r_no}`);

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
                        방 수정
                    </Typography>

                    <form onSubmit={modifyRoomConfirm} name='modify_room_confirm' style={{ width: '100%', marginTop: 1 }}>
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
                            InputProps={{
                                readOnly: true,
                                style: { backgroundColor: "#e0e0e0" },
                            }}
                            value={backEndData.a_acc_no || ''}
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
                            value={backEndData.a_m_no || ''}
                            onChange={handleChange}

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

                        />


                        <input type="file" accept="image/*" ref={fileInputRef} onChange={uploadProfile} multiple="multiple" style={{ display: 'none' }} id="fileInput" />
                        <label htmlFor="fileInput">
                            <Button variant="contained" color="primary" sx={{
                                mt: 2, mr: 2, backgroundColor: "black",
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


                        <FormControl sx={{ mt: 3 }}>
                            <FormLabel id="demo-row-radio-buttons-group-label">숙박/대실</FormLabel>
                            <RadioGroup
                                row

                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="a_r_state"
                                value={a_r_state}
                                // onChange={handleChange}
                                onChange={(e) => {
                                    setA_r_state(e.target.value);
                                    if (e.target.value === '') {
                                        setFieldErrors(prevErrors => ({
                                            ...prevErrors,
                                            a_r_state: true
                                        }));
                                    } else {
                                        setFieldErrors(prevErrors => ({
                                            ...prevErrors,
                                            a_r_state: false
                                        }));
                                    }
                                }}
                            >
                                <FormControlLabel value="숙박" control={<Radio />} label="숙박" />
                                <FormControlLabel value="대실" control={<Radio />} label="대실" />
                                {fieldErrors.a_r_state && <FormHelperText error>숙박/대실 종류를 선택하세요.</FormHelperText>}
                            </RadioGroup>

                        </FormControl>



                        {/* <TextField
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

                        /> */}

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="a_r_price"
                            label="가격"
                            name="a_r_price"
                            type="text"
                            InputProps={{
                                endAdornment: <InputAdornment position="start">원</InputAdornment>,
                            }}
                            autoComplete="off"
                            value={a_r_price}
                            onChange={handleChange}

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

                                    minutesStep={30} // 1시간 단위로 변경
                                >
                                    {({ inputRef, inputProps, InputProps }) => (
                                        <TextField
                                            ref={inputRef}
                                            {...inputProps}
                                            InputProps={{ ...InputProps }} // 아이콘 같은 끝 장식을 위한 속성
                                            label="체크인 시간"
                                        />
                                    )}
                                </TimePicker>

                                <h2>~</h2>

                                <TimePicker
                                    label="체크아웃 시간"
                                    value={a_r_check_out}
                                    onChange={handleCheckOutTimeChange}

                                    minutesStep={30} // 1시간 단위로 변경
                                >
                                    {({ inputRef, inputProps, InputProps }) => (
                                        <TextField
                                            ref={inputRef}
                                            {...inputProps}
                                            InputProps={{ ...InputProps }}
                                            label="체크아웃 시간"
                                        />
                                    )}
                                </TimePicker>
                            </LocalizationProvider>
                        </Box>
                        <Typography variant="caption" sx={{ alignSelf: 'flex-start', mt: 1, ml: 7 }}>
                            * 시간 단위로만 설정 가능
                        </Typography>


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

                            >
                                수정
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
            </Paper >
        </Container >

    );
}

export default ModifyRoom;