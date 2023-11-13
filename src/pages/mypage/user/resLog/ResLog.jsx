import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import api from '../../../../hooks/RefreshTokenAuto';
import ResLogFilter from './ResLogFilter';
import ResLogList from './ResLogList';

const list = {
    align: 'center',
    bgcolor: 'background.paper',
    height: '10rem',
    mt: '1rem',
    padding: '1rem',
};

function ResLog() {

    return (
        <>
            <ResLogFilter />
            <ResLogList />
        </>
    );
}

export default ResLog;