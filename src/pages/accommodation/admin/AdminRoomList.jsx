import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const AdminRoomList = () => {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [items, setItems] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>방 등록</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="이름"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        label="이름"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                    <Button onClick={handleAdd} color="primary">
                        등록
                    </Button>
                </DialogActions>
            </Dialog>
            <List>
                {items.map((item, index) => (
                    <ListItem key={index}>{item}</ListItem>
                ))}
            </List>
        </div>
    );

}



export default AdminRoomList;
