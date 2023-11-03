import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import accmImg from '../../../assets/temp.jpg';
import Rating from '@mui/material/Rating';

const list = {
    bgcolor: 'background.paper',
    height: '8rem',
    mt: '1rem',
    padding: '1rem', 
  };

const font = {
    fontSize: '15px',
    fontWeight: 'normal',
};

const titleFont = {
    fontSize: '16px',
    fontWeight: 'bold',
};

const info = {
    textAlign: 'right',
    fontSize: '15px',
    fontWeight: 'normal',
}

function SearchAccmList() {
  const [value, setValue] = React.useState(4);

  return (
    <Grid container>
        <Grid item xs={6}> 
            <Box sx={{ ...list, borderRadius: '13px', mr: '1rem'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <img style={{maxHeight: '125px', maxWidth: '200px'}} src={accmImg} alt="Accm Image" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ borderRadius: '13px', mr: '1rem'}}>
                            <Typography sx={{...titleFont}}>
                                숙박업소 이름 
                            </Typography> 
                            <Rating name="read-only" value={value} readOnly size="small"/>
                            <Typography sx={{ ...font }} >
                                모텔 
                            </Typography>
                            <Typography sx={{ ...info, mt: '10px' }} >
                                대실 4시간 | 40,000원~
                            </Typography>
                            <Typography sx={{ ...info }} >
                                숙박 15:00~ | 80,000원~
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={6}> 
            <Box sx={{ ...list, borderRadius: '13px', mr: '1rem'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <img style={{maxHeight: '125px', maxWidth: '200px'}} src={accmImg} alt="Accm Image" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ borderRadius: '13px', mr: '1rem'}}>
                            <Typography sx={{...titleFont}}>
                                숙박업소 이름 
                            </Typography> 
                            <Rating name="read-only" value={value} readOnly size="small"/>
                            <Typography sx={{ ...font }} >
                                호텔 
                            </Typography>
                            <Typography sx={{ ...info, mt: '2rem' }} >
                                숙박 15:00~ | 80,000원~
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={6}> 
            <Box sx={{ ...list, borderRadius: '13px', mr: '1rem'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <img style={{maxHeight: '125px', maxWidth: '200px'}} src={accmImg} alt="Accm Image" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ borderRadius: '13px', mr: '1rem'}}>
                            <Typography sx={{...titleFont}}>
                                숙박업소 이름 
                            </Typography> 
                            <Rating name="read-only" value={value} readOnly size="small"/>
                            <Typography sx={{ ...font }} >
                                모텔 
                            </Typography>
                            <Typography sx={{ ...info, mt: '10px' }} >
                                대실 4시간 | 40,000원~
                            </Typography>
                            <Typography sx={{ ...info }} >
                                숙박 15:00~ | 80,000원~
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={6}> 
            <Box sx={{ ...list, borderRadius: '13px', mr: '1rem'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <img style={{maxHeight: '125px', maxWidth: '200px'}} src={accmImg} alt="Accm Image" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ borderRadius: '13px', mr: '1rem'}}>
                            <Typography sx={{...titleFont}}>
                                숙박업소 이름 
                            </Typography> 
                            <Rating name="read-only" value={value} readOnly size="small"/>
                            <Typography sx={{ ...font }} >
                                호텔 
                            </Typography>
                            <Typography sx={{ ...info, mt: '2rem' }} >
                                숙박 15:00~ | 80,000원~
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={6}> 
            <Box sx={{ ...list, borderRadius: '13px', mr: '1rem'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <img style={{maxHeight: '125px', maxWidth: '200px'}} src={accmImg} alt="Accm Image" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ borderRadius: '13px', mr: '1rem'}}>
                            <Typography sx={{...titleFont}}>
                                숙박업소 이름 
                            </Typography> 
                            <Rating name="read-only" value={value} readOnly size="small"/>
                            <Typography sx={{ ...font }} >
                                모텔 
                            </Typography>
                            <Typography sx={{ ...info, mt: '10px' }} >
                                대실 4시간 | 40,000원~
                            </Typography>
                            <Typography sx={{ ...info }} >
                                숙박 15:00~ | 80,000원~
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={6}> 
            <Box sx={{ ...list, borderRadius: '13px', mr: '1rem'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <img style={{maxHeight: '125px', maxWidth: '200px'}} src={accmImg} alt="Accm Image" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ borderRadius: '13px', mr: '1rem'}}>
                            <Typography sx={{...titleFont}}>
                                숙박업소 이름 
                            </Typography> 
                            <Rating name="read-only" value={value} readOnly size="small"/>
                            <Typography sx={{ ...font }} >
                                호텔 
                            </Typography>
                            <Typography sx={{ ...info, mt: '2rem' }} >
                                숙박 15:00~ | 80,000원~
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={6}> 
            <Box sx={{ ...list, borderRadius: '13px', mr: '1rem'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <img style={{maxHeight: '125px', maxWidth: '200px'}} src={accmImg} alt="Accm Image" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ borderRadius: '13px', mr: '1rem'}}>
                            <Typography sx={{...titleFont}}>
                                숙박업소 이름 
                            </Typography> 
                            <Rating name="read-only" value={value} readOnly size="small"/>
                            <Typography sx={{ ...font }} >
                                모텔 
                            </Typography>
                            <Typography sx={{ ...info, mt: '10px' }} >
                                대실 4시간 | 40,000원~
                            </Typography>
                            <Typography sx={{ ...info }} >
                                숙박 15:00~ | 80,000원~
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
        <Grid item xs={6}> 
            <Box sx={{ ...list, borderRadius: '13px', mr: '1rem'}}>
                <Grid container>
                    <Grid item xs={6}>
                        <img style={{maxHeight: '125px', maxWidth: '200px'}} src={accmImg} alt="Accm Image" />
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{ borderRadius: '13px', mr: '1rem'}}>
                            <Typography sx={{...titleFont}}>
                                숙박업소 이름 
                            </Typography> 
                            <Rating name="read-only" value={value} readOnly size="small"/>
                            <Typography sx={{ ...font }} >
                                호텔 
                            </Typography>
                            <Typography sx={{ ...info, mt: '2rem' }} >
                                숙박 15:00~ | 80,000원~
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    </Grid>
  );
}

export default SearchAccmList;