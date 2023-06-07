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

  const fetchUserSettings = async () => {
    const response = await fetch(`https://alexhlins1.fvds.ru:1338/users/${userId}/settings`);
    const resJSON = await response.json();

    setUserSettings(resJSON);
    createSchedule(resJSON.schedule);
  }

  useEffect(()=>{
    fetchUserSettings();
  }, []);

  return <Stack ref={nodeRef} className='mainContainer' spacing={2}>
            <Stack
                position='relative'
                direction='row'
                justifyContent='center'
                alignItems='center'
            >
                <IconButton
                onClick={()=>{
                  dispatch(selectedAndPrevPageResolver(1));
                  setTimeout(()=>navigate('/inputfirst'), 0);
                }}
                sx={{
                    position : 'absolute',
                    left : 0
                }}>
                    <ArrowBackIcon sx={{
                        color : 'black'
                    }}/>
                </IconButton>
                <Box className='mainLabel'>Вход</Box>
            </Stack>
            <Box height='15vh'/>
            <Box className='hintLabel'>
                Заполните данные
            </Box>
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