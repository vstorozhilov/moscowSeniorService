import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import { useNavigate } from 'react-router-dom';
import Slider from '@mui/material/Slider';
import { useAppDispatch } from '../stateManager/hooks';

export default function AdminPagePreferences(props) {

  const nodeRef = useRef(null);
  const dispatch = useAppDispatch();
  const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
  const navigate = useNavigate();
  const [prefOne, setPrefOne] = useState(0);
  const [prefTwo, setPrefTwo] = useState(0);
  const [prefThree, setPrefThree] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);

  const fetchPrefs = async () => {
    let responce = await fetch('https://alexhlins1.fvds.ru:1338/admin/preferences');
    let resJSON = await responce.json();

    setPrefOne(Math.floor(resJSON['offline'] * 100));
    setPrefTwo(Math.floor(resJSON['group'] * 100));
    setPrefThree(Math.floor(resJSON['outdoor'] * 100));

  }

  useEffect(()=>{
    fetchPrefs();
  }, [])

  return <>
        <Stack ref={nodeRef}
        className='mainContainer'
        spacing={2}
        sx={{
            height : '100%'
        }}>
            <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-around'
            >
                <IconButton
                onClick={()=>{
                    dispatch(selectedAndPrevPageResolver(11));
                    setTimeout(()=>navigate('/adminmain'), 0);
                }}
                sx={{
                    position : 'absolute',
                    left : 0
                }}>
                    <ArrowBackIcon sx={{
                        color : 'black'
                    }}/>
                </IconButton>
                <Box className='mainLabel'>Приоритеты занятий</Box>
            </Stack>
            <Box sx={{height : 30}}></Box>
            <Stack spacing={2} direction='column' alignItems='start' sx={{
                fontWeight : 500
            }}>
                <Box>Увеличить вес групповых<br></br>активностей перед индивидуальными</Box>
                <Slider
                value={prefTwo}
                onChange={(__, newVal)=>{
                    if (isDisabled) setIsDisabled(false);
                    setPrefTwo(newVal);
                }}
                valueLabelDisplay="on"
                sx={{
                    '& .MuiSlider-rail' : {
                        background: 'linear-gradient(90deg, #C5B577, #CC2222) !important',
                        borderRadius: 5,
                        height : 13,
                        //width : 350
                    },
                    '& .MuiSlider-track' : {
                        background: 'transparent',
                        borderRadius: 5,
                        height : 13,
                        border : 'none'
                    },
                    '& .MuiSlider-thumb' : {
                        backgroundColor: 'black',
                        height : 30,
                        width : 30,
                        borderRadius : '50%'
                    },
                    '& .MuiSlider-valueLabelOpen' : {
                        backgroundColor: 'black',
                        height : 30,
                        width : 30,
                        borderRadius : '50%',
                        transform : 'translateY(10px) scale(1) !important'
                    },
                    '& .MuiSlider-valueLabelOpen::before' : {
                        display : 'none'
                    }
                }}/>
                <Box>Увеличить оффлайн перед онлайном</Box>
                <Slider
                value={prefOne}
                onChange={(__, newVal)=>{
                    if (isDisabled) setIsDisabled(false);
                    setPrefOne(newVal);
                }}
                valueLabelDisplay="on"
                sx={{
                    '& .MuiSlider-rail' : {
                        background: 'linear-gradient(90deg, #C5B577, #CC2222) !important',
                        borderRadius: 5,
                        height : 13,
                        //width : 350
                    },
                    '& .MuiSlider-track' : {
                        background: 'transparent',
                        borderRadius: 5,
                        height : 13,
                        border : 'none'
                    },
                    '& .MuiSlider-thumb' : {
                        backgroundColor: 'black',
                        height : 30,
                        width : 30,
                        borderRadius : '50%'
                    },
                    '& .MuiSlider-valueLabelOpen' : {
                        backgroundColor: 'black',
                        height : 30,
                        width : 30,
                        borderRadius : '50%',
                        transform : 'translateY(10px) scale(1) !important'
                    },
                    '& .MuiSlider-valueLabelOpen::before' : {
                        display : 'none'
                    }
                }}/>
                <Box>Увеличить вес хобби на свежем воздухе</Box>
                <Slider
                value={prefThree}
                onChange={(__, newVal)=>{
                    if (isDisabled) setIsDisabled(false);
                    setPrefThree(newVal);
                }}
                valueLabelDisplay="on"
                sx={{
                    '& .MuiSlider-rail' : {
                        background: 'linear-gradient(90deg, #C5B577, #CC2222) !important',
                        borderRadius: 5,
                        height : 13
                    },
                    '& .MuiSlider-track' : {
                        background: 'transparent',
                        borderRadius: 5,
                        height : 13,
                        border : 'none'
                    },
                    '& .MuiSlider-thumb' : {
                        backgroundColor: 'black',
                        height : 30,
                        width : 30,
                        borderRadius : '50%'
                    },
                    '& .MuiSlider-valueLabelOpen' : {
                        backgroundColor: 'black',
                        height : 30,
                        width : 30,
                        borderRadius : '50%',
                        transform : 'translateY(10px) scale(1) !important'
                    },
                    '& .MuiSlider-valueLabelOpen::before' : {
                        display : 'none'
                    }
                }}
                />
            </Stack>
            <Stack sx={{
                height : '100%',
                justifyContent : 'end',
                paddingBottom : 2
            }}>
                <Button
                    disabled={isDisabled}
                    onClick={()=>{
                        console.log(prefOne, prefTwo, prefThree);
                        fetch('https://alexhlins1.fvds.ru:1338/admin/preferences',
                            {
                                method : 'POST',
                                headers : {
                                    accept : 'application/json',
                                    'Content-Type' : 'application/json'
                                },
                                body : JSON.stringify({
                                    offline : prefOne / 100,
                                    group : prefTwo / 100,
                                    outdoor : prefThree / 100
                                })
                            }
                        );
                        setIsDisabled(true);
                        // dispatch(selectedAndPrevPageResolver(1));
                        // setTimeout(()=>navigate('/inputfirst'), 0);
                    }}
                    className="actionButton"
                    variant="contained"
                    sx={{
                        justifySelf : 'end',
                    }}
                    >
                    <Box>Сохранить</Box>
                </Button>
            </Stack>
        </Stack>
        </>
};