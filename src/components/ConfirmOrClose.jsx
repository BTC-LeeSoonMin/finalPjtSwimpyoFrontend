import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Button } from '@mui/material'
import React from "react";

const ConfirmOrClose = ({ open, close, confirmation, words }) => {

    return (
        <Dialog open={open}>
            <DialogTitle>{words} 하시겠습니까?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {words} 을(를) 진행하려면 확인을, 취소하려면 취소를 선택하세요.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmation} color="primary">
                    확인
                </Button>
                <Button onClick={close} color="primary">
                    취소
                </Button>

            </DialogActions>
        </Dialog>
    );

}

export default ConfirmOrClose;