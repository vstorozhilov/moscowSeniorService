import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector,
    useAppDispatch
  } from '../stateManager/hooks';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import MaxTripTimeSelector from '../components/MaxTripTimeSelector';
import ScheduleConstructor from '../components/ScheduleConstructor';
import { scheduleSlice } from '../stateManager/ScheduleConstructor';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function AddressScheduleAndTripTime (props) {

  const nodeRef = useRef(null);
  const { pageIndex } = props;
  const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
  const dispatch = useAppDispatch();
  const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
  const userId = useAppSelector(state=>state.SelectedCharacterReducer.id);
  const [ userSettings, setUserSettings ] = useState({});
  const { createSchedule } = scheduleSlice.actions;
  const schedule = useAppSelector(state=>state.scheduleReducer);
  const { maxTripTime } = useAppSelector(state=>state.maxTripTimeReducer);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(prev=>{
        if (prev == null) return event.currentTarget;
        else return null;
    });
  };
  const open = Boolean(anchorEl);

  const fetchUserSettings = async () => {
    const response = await fetch(`https://alexhlins1.fvds.ru:1338/users/${userId}/settings`);
    const resJSON = await response.json();

    console.log(resJSON)
    setUserSettings(resJSON);
    createSchedule(resJSON.schedule);
  }

  useEffect(()=>{
    fetchUserSettings();
  }, []);

  return <Stack ref={nodeRef} className='mainContainer' spacing={4}>
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <IconButton
                onClick={()=>{
                  dispatch(selectedAndPrevPageResolver(1));
                  setTimeout(()=>navigate('/inputfirst'), 0);
                }}>
                    <ArrowBackIcon sx={{
                        color : 'black'
                    }}/>
                </IconButton>
                <Box className='mainLabel'>Настройки</Box>
                <IconButton onClick={handleClick}>
                    <MenuIcon sx={{
                        color : 'black'
                    }} />
                </IconButton>
            </Stack>
            {/* <Box height='2vh'/> */}
            <Box className='hintLabel'>
                Заполните данные
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
            >
                <MenuItem onClick={()=>{
                    handleClose();
                    dispatch(selectedAndPrevPageResolver(11));
                    setTimeout(()=>navigate('/adminmain'), 0);
                }}>Админка</MenuItem>
            </Menu>
            <TextField
                disabled
                // label='Адрес'
                className='inputTextField'
                value={ Object.keys(userSettings).length > 0 ? userSettings.location.address : 'Адрес'}
            />
              <MaxTripTimeSelector/>
              <ScheduleConstructor/>
            <Stack direction='row' justifyContent='flex-end'>
                <Button
                className="actionButton"
                variant="contained"
                endIcon={<ArrowForwardIcon/>}
                  onClick={async ()=>{
                    dispatch(selectedAndPrevPageResolver(3));
                    setTimeout(()=>navigate('/main'), 0);
                  }
                }>
                  <Box>Вперед</Box>
                </Button>
            </Stack>
        </Stack>
};