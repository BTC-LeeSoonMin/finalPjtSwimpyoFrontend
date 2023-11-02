import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from "react-router";
import ConfirmOrClose from "../../../components/ConfirmOrClose";
import axios from "axios";

const AdminRoomList = ({ accomNum, requestData }) => {

    // 모달창 열기 //
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);

    // 백엔드에서 온 데이터
    const [backEndData, setBackEndData] = useState({
        roomData: {},
        roomImages: [],
        roomImageNos: []
    });

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log("accomNum", accomNum.a_acc_no);
    console.log("accomNum.a_m_no", accomNum.a_m_no);

    const handleRegistConfirmation = () => {
        navigate(`/admin/accommodation/registRoom/${accomNum.a_acc_no}`);
    }


    const handleAdd = () => {
        if (name) {
            setItems(prevItems => [...prevItems, name]);
            setName('');
            setOpen(false);
        }
    };


    useEffect(() => {
        fetchData(); // 비동기 함수 호출
    }, [requestData]);

    const fetchData = async () => {
        try {
            const res = await axios.post(`http://localhost:8090/api/admin/room/showRoomDetail?a_m_no=${accomNum.a_m_no}`);
            //  res -> 서버에서 받아온 데이터
            console.log("room data success");
            // res.data에서 얻은 데이터를 화면에 업데이트 하기 위해 data상태에 설정한다. data 상태를 업데이트 하면 화면이 새로 렌더링 된다.
            console.log("확인 : ", res.data);
            setBackEndData({
                roomData: res.data.adminRoomDto,
                roomImages: res.data.r_i_images,
                roomImageNos: res.data.r_i_nos
            });
            console.log("accmData", backEndData);
            // setImages(res.data.a_i_images);
            // const imageUrls = images.a_i_images;
            // setImages(imageUrls);

        } catch (error) {
            console.error("에러 발생", error);
        }
    };


    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                +
            </Button>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                ))}
            </List>
            <ConfirmOrClose open={open} close={handleClose} confirmation={handleRegistConfirmation} words="등록" />
        </div>
    );

}



export default AdminRoomList;
