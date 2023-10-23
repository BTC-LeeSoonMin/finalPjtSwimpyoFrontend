import * as React from 'react';
import {Grid, Container} from '@mui/material';
import Box from '@mui/material/Box';

const calendarStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  border: 1,
  height: '40rem',
  margin: '1rem',
};

const chartStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  border: 1,
  height: '20rem',
  margin: '1rem',
};


export default function AdminMain() {

  return (
    <Container component="main">
    <Grid container>
      
      <Grid item xs={9}>
        <Box sx={{ ...calendarStyles, borderRadius: '13px' }}>
            
        </Box>
      </Grid>
      <Grid item xs={3}>
        <Box sx={{ ...chartStyles, borderRadius: '13px' }}>
         
        </Box>
      </Grid>
    </Grid>
    </Container>
  );
}
