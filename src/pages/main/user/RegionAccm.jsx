import React from 'react';
import { Divider, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import temp3 from '../../../assets/temp3.png';
import MuiPaper from '@mui/material/Paper';
import axios from 'axios';

const Item = styled(MuiPaper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 'normal',
    margin: '10px',
  };

export default function RegionAccm() {

    const config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };

    const regionAccm = (e, value) => {
        e.preventDefault();
        const region = value;
        console.log('region', region);
        
        axios.get("/api/user/accm/mapInfoList", JSON.stringify(region), config,)
        .then((response) => {
          console.log('searchAccm', response.data);
          if(response.data === 'emptyMapInfo') {
            console.log('실패: emptyMapInfo');
          } else {
            console.log('성공');
          }
        });
    
      };

    return(

        <Grid item xs={5}>
            <Item>
              <Grid container>
                <Grid item xs={3}>
                  지역별 숙소
                </Grid>
                <Grid item xs={9} sx={{ mt: '10px' }}>
                  <Divider variant="middle" />
                </Grid>
              </Grid>
              <Link onClick={(e) => regionAccm(e, '서울')} style={linkStyle}>
                서울
              </Link>
              <Link onClick={(e) => regionAccm(e, '부산')} style={linkStyle}>
                부산
              </Link>
              <Link onClick={(e) => regionAccm(e, '제주')} style={linkStyle}>
                제주
              </Link>
              <Link onClick={(e) => regionAccm(e, '경기')} style={linkStyle}>
                경기
              </Link>
              <Link onClick={(e) => regionAccm(e, '인천')} style={linkStyle}>
                인천
              </Link>
              <Link onClick={(e) => regionAccm(e, '강원')} style={linkStyle}>
                강원
              </Link>
              <Link onClick={(e) => regionAccm(e, '경상')} style={linkStyle}>
                경상
              </Link>
              <Link onClick={(e) => regionAccm(e, '전라')} style={linkStyle}>
                전라
              </Link>
              <Link onClick={(e) => regionAccm(e, '충청')} style={linkStyle}>
                충청
              </Link>
              <img src={temp3} style={{ width: '418px', height: 'auto', margin: '1rem' }} />
            </Item>
          </Grid>

    );

}