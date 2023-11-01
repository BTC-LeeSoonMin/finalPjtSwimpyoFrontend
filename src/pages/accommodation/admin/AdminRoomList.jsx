import React, { useState } from "react";
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

const AdminRoomList = ({ accomNum }) => {

    // 모달창 열기 //
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);

    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log("accomNum", accomNum.a_acc_no);

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
