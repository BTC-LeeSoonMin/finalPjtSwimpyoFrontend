import { Button, Container, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EmptyAccm() {
    const navigate = useNavigate();

    const handleRegistAccm = (e) => {
        e.preventDefault();
        navigate(`/admin/accommodation/registAccm`);
    };

    return(
        <Container component="main" sx={{ marginBottom: '3rem', marginTop: '3rem' }}>
                <Paper elevation={3} sx={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography
                        variant="h1"
                        component="div"
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10rem', 
                            color: 'rgba(0, 0, 0, 0.8)' 
                        }}
                    >
                        × {/* This is a multiplication sign, which resembles an X mark. */}
                    </Typography>
                    <Typography component="h2" variant="h6" align="center">
                        현재 등록된 숙박 시설이 없습니다. 숙박 시설을 등록해주세요.
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            mt: 3,
                            width: 150, 
                            backgroundColor: "black",
                            borderColor: 'white', 
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                            },
                        }}
                        onClick={(e) => handleRegistAccm(e)}
                    >
                        숙박 시설 등록
                    </Button>
                </Paper>
            </Container >
    );
}