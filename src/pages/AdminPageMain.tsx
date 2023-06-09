import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import { useAppSelector, useAppDispatch } from '../stateManager/hooks';
import { useNavigate } from 'react-router-dom';
import { mainTabSlice } from '../stateManager/mainTab';

export default function AdminPageMain(props) {

  const displayNumber = useAppSelector(state=>state.DisplayNUmberReducer);
  const dispatch = useAppDispatch();
  const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
  const navigate = useNavigate();
  const { selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer)

  const tab = useAppSelector(state=>state.MainTabReducer);

  return <>
        <Stack
        className='mainContainer'
        spacing={0.6}
        sx={{
            height : '100%'
        }}>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-around'
                sx={{
                    marginBottom : 2
                }}
            >
                <IconButton
                onClick={()=>{

                    if (prevPageIndex == 2) dispatch(selectedAndPrevPageResolver(2));
                    else if (prevPageIndex == 3) dispatch(selectedAndPrevPageResolver(3));
                    else {
                        dispatch(selectedAndPrevPageResolver(1));
                    }
                    setTimeout(()=>{
                        if (prevPageIndex == 2) navigate('/inputsecond');
                        else if (prevPageIndex == 3) navigate('/main');
                        else {
                            navigate('/inputfirst');
                        }
                    }, 0);
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
            <Button
                onClick={()=>{
                    dispatch(selectedAndPrevPageResolver(12));
                    setTimeout(()=>navigate('/adminpreferences'), 0);
                }}
            ><Stack
                sx={{
                    textTransform : 'none',
                    backgroundColor : '#CC2222',
                    color : 'white',
                    borderRadius : '16px',
                    paddingTop : 1.5,
                    paddingLeft : 1.5
                }}
                width='100%'
                height='200px'
                direction='column'
                justifyContent='start'
                alignItems='start'
                spacing={1}
            >
                <Box sx={{
                    fontWeight : 500,
                    fontSize : 24
                }}>Приоритеты занятий</Box>
                <Box sx={{
                    fontSize : 16,
                    fontWeight : 400
                }}>регулировка параметров</Box>
            </Stack></Button>

            <Button
            onClick={()=>{
                dispatch(selectedAndPrevPageResolver(13));
                setTimeout(()=>navigate('/adminpiecharts'), 0);
            }}><Stack
                sx={{
                    textTransform : 'none',
                    backgroundColor : '#F7F5ED',
                    borderRadius : '16px',
                    paddingTop : 1.5,
                    paddingLeft : 1.5,
                    color : 'black'
                }}
                width='100%'
                height='200px'
                direction='column'
                justifyContent='start'
                alignItems='start'
                spacing={1}
            >
                <Box sx={{
                    fontWeight : 500,
                    fontSize : 24
                }}>Статистика</Box>
                <Box sx={{
                    fontSize : 16,
                    fontWeight : 400
                }}>аналитика активностей</Box>
            </Stack></Button>

            <Button><Stack
                sx={{
                    backgroundColor : '#F7F5ED',
                    borderRadius : '16px',
                    paddingTop : 1.5,
                    paddingLeft : 1.5,
                    color : 'black',
                    textTransform : 'none'
                }}
                width='100%'
                height='200px'
                direction='column'
                justifyContent='start'
                alignItems='start'
                spacing={1}
            >
                <Box sx={{
                    fontWeight : 500,
                    fontSize : 24
                }}>Сценарии чата</Box>
                <Box sx={{
                    fontSize : 16,
                    fontWeight : 400
                }}>редактирование промптов</Box>
            </Stack>
            </Button>
        </Stack>
        </>
};