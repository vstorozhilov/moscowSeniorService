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

const onboardingDisplays = [
    DisplayOne,
    DisplayTwo,
    DisplayThree
];

export default function MainPage (props) {

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
        <TransitionGroup
            component={null}
            appear
        >
            {onboardingDisplays.filter((_, index)=>index==displayNumber).map(Item=>
                <CSSTransition
                timeout={200}
                classNames='onboardingDisplay'
                key={displayNumber}
                unmountOnExit
                >
                    <Item/>
                </CSSTransition>
            )}
        </TransitionGroup>
        <Stack ref={nodeRef} className='mainContainer' spacing={2}>
            <Stack
                position='relative'
                direction='row'
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
                <Box className='mainLabel'>Главная</Box>
            </Stack>
            <Button className='startChat'
            sx={{
                zIndex : displayNumber == 0 ? 1 : 0
            }}
            onClick={()=>{
                if (displayNumber == 0) {
                    dispatch(setDisplayNumber(1));
                }
                else {
                    dispatch(selectedAndPrevPageResolver(8));
                    setTimeout(()=>navigate('/questionone'), 0);
                }
            }}>
                <Stack width='100%' direction='column' alignItems='start'>
                    <Box>Подобрать активность</Box>
                    <Box sx={{
                        fontSize : 16,
                        fontWeight : 400}}>Выбери новую активность</Box>
                </Stack>
            </Button>
            <ToggleButtonGroup
                className='toggleGroupButton'
                value={tab}
                exclusive
                onChange={handleTab}
                >
                <ToggleButton
                sx={{
                    backgroundColor : 'white',
                    zIndex : displayNumber == 1 ? 1 : 0
                }}
                className='activityCategoriesBookingsTab'
                value={'activityCategories'}
                onClick={
                    (e)=>{
                        if (displayNumber == 1) {
                            e.preventDefault();
                            dispatch(setDisplayNumber(2));
                        }
                    }
                }>
                    <Stack width='100%' spacing={2} direction='column' justifyContent='start' alignItems='start'>
                        <Stack direction='column' alignItems='start'>
                            <Box sx={{
                                fontSize : 20,
                                fontWeight: 700
                            }}>Вам</Box>
                            <Box sx={{
                                fontSize : 20,
                                fontWeight: 700
                            }}>подойдут</Box>
                        </Stack>
                        <Box sx={{
                                fontSize : 14,
                                fontWeight: 400
                            }}>находятся рядом</Box>
                    </Stack>
                </ToggleButton>
                <ToggleButton
                    className='activityCategoriesBookingsTab'
                    value={'bookings'}
                    sx={{
                        zIndex : displayNumber == 2 ? 1 : 0
                    }}
                    onClick={
                        (e)=>{
                            if (displayNumber == 2) {
                                e.preventDefault();
                                dispatch(setDisplayNumber(3));
                            }
                        }
                    }
                >
                    <Stack width='100%' spacing={2} direction='column' justifyContent='start' alignItems='start'>
                        <Stack direction='column' alignItems='start'>
                            <Box sx={{
                                width : '100%',
                                fontSize : 20,
                                fontWeight: 700
                            }}>Текущие</Box>
                            <Box sx={{
                                fontSize : 20,
                                fontWeight: 700
                            }}>записи</Box>
                        </Stack>
                        <Box sx={{
                                fontSize : 14,
                                fontWeight: 400,
                            }}>акутальные активности</Box>
                    </Stack>
                </ToggleButton>
            </ToggleButtonGroup>
            {tab == 'activityCategories' ? <ActivityCategories/> : null}
            {tab == 'bookings' ? <Bookings/> : null}
            {/* {activityCategoriesId.map(id=>{
                return <ActivityCategoryCard activityCategoryId={id}/>
            })}
            <Box>Можно попробовать</Box>
            {activityCategoriesId.map(id=>{
                return <ActivityCategoryCard activityCategoryId={id}/>
            })} */}
        </Stack></>
};