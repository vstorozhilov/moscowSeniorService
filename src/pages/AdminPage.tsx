import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ActivityCategoryCard from '../components/ActivityCategoryCard';
import { ActivityCategorySlice } from '../stateManager/ActivityCategories';
import { useAppSelector, useAppDispatch } from '../stateManager/hooks';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ActivityCategories from './ActivityCategories';
import Bookings from './Bookings';
import { useNavigate } from 'react-router-dom';
import DisplayOne from './onboardingDislays/DisplayOne';
import DisplayTwo from './onboardingDislays/DisplayTwo';
import DisplayThree from './onboardingDislays/DisplayThree';
import { displayNumberSlice } from '../stateManager/displayOnboardingNumber';
import { mainTabSlice } from '../stateManager/mainTab';
import Slider from '@mui/material/Slider';

export default function AdminPage(props) {

  const displayNumber = useAppSelector(state=>state.DisplayNUmberReducer);

  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();
  const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
  const navigate = useNavigate();
  const { setDisplayNumber } = displayNumberSlice.actions;
  const { setMainTab } = mainTabSlice.actions;

  const tab = useAppSelector(state=>state.MainTabReducer);

  const handleTab = (
      __: React.MouseEvent<HTMLElement>,
      newTab: 'booking' | 'activityCategories' | null
    ) => {
      if (newTab != null) {
        dispatch(setMainTab(newTab));
      }
    };

  return <>
        <Stack ref={nodeRef} className='mainContainer' spacing={2}>
            <Stack
                position='relative'
                direction='column'
                justifyContent='center'
                alignItems='center'
            >
                <IconButton
                onClick={()=>{
                    dispatch(selectedAndPrevPageResolver(2));
                    setTimeout(()=>navigate('/inputsecond'), 0);
                }}
                sx={{
                    position : 'absolute',
                    left : 0
                }}>
                    <ArrowBackIcon sx={{
                        color : 'black'
                    }}/>
                </IconButton>
                <Box className='mainLabel'>Админка</Box>
            </Stack>
            <Box sx={{height : 30}}></Box>
            <Stack spacing={2} alignItems='center'>
                <Box>Увеличить вес групповых активностей перед индивидуальными</Box>
                <Slider sx={{
                    '& .MuiSlider-rail' : {
                        background: 'linear-gradient(90deg, #C5B577 0%, #CC2222 93.25%)',
                        borderRadius: 5,
                        height : 13,
                        width : 350
                    },
                    '& .MuiSlider-track' : {
                        background: 'transparent',
                        borderRadius: 5,
                        height : 13,
                        border : 'none'
                    }
                }}/>
                <Box>Увеличить оффлайн перед онлайном</Box>
                <Slider sx={{
                    '& .MuiSlider-rail' : {
                        background: 'linear-gradient(90deg, #C5B577 0%, #CC2222 93.25%)',
                        borderRadius: 5,
                        height : 13,
                        width : 350
                    },
                    '& .MuiSlider-track' : {
                        background: 'transparent',
                        borderRadius: 5,
                        height : 13,
                        border : 'none'
                    }
                }}/>
                <Box>Увеличить вес хобби на свежем воздухе</Box>
                <Slider sx={{
                    '& .MuiSlider-rail' : {
                        background: 'linear-gradient(90deg, #C5B577 0%, #CC2222 93.25%)',
                        borderRadius: 5,
                        height : 13,
                        width : 350
                    },
                    '& .MuiSlider-track' : {
                        background: 'transparent',
                        borderRadius: 5,
                        height : 13,
                        border : 'none'
                    }
                }}/>
            </Stack>
        </Stack>
        </>
};