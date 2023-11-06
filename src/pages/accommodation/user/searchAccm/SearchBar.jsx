import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../../../hooks/RefreshTokenAuto';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(7),
      width: '100%',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default function SearchBar() {
    const config = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };

    const navigate = useNavigate();

    const searchEnter = (e) => {
        if (e.key === 'Enter') {

            const searchWord = e.target.value;
            console.log('검색어', searchWord);

            api.get("/api/user/accm/search", JSON.stringify(searchWord), config,)
                .then((response) => {
                    console.log(response.data);
                    if (response.data !== null) {
                        navigate('/user/searchAccm');
                    } 

                });

        }
      };

    return(

        <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="숙소명을 검색해보세요."
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={searchEnter}
            />
          </Search>

    );
}