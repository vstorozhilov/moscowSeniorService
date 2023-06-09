import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppSelector,
    useAppDispatch
  } from '../stateManager/hooks';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import { selectedCharacterSlice, selectedСharacterInterface } from '../stateManager/SelectedСharacter';
import { UserProfileSlice } from '../stateManager/UserProfile';
import { useNavigate } from 'react-router-dom';
import { displayNumberSlice } from '../stateManager/displayOnboardingNumber';

interface demoUser {
  "id": number,
  "label" : string,
  "year" : string
}

export default function SurNameAndBirthDateInput (props) {

  const nodeRef = useRef(null);
  const { pageIndex } = props;
  const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
  const dispatch = useAppDispatch();
  const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
  const { selectedCharacterResolver } = selectedCharacterSlice.actions;
  const selectedCharacter = useAppSelector(state=>state.SelectedCharacterReducer);
  const { setDisplayNumber } = displayNumberSlice.actions;


  const [demoUsers, setDemoUsers] = useState<selectedСharacterInterface[]>([]);
  const navigate = useNavigate();

  const fetchDemoUsers = async () => {
    let response = await fetch('https://alexhlins1.fvds.ru:1338/users/demo', {
      mode : 'cors'
    });
    let resJSON = await response.json();

    setDemoUsers(resJSON.map(item=>({
      id : item.id,
      label : item.name + ' ' + item.surname + ' ' + (item.coldStart ? '(новый)' : '(известный)') + ' ' + item.id,
      year : item.birthdate
    })));
  }

  useEffect(()=>{
    fetchDemoUsers();
  }, [])

  return <Stack ref={nodeRef} className='mainContainer' spacing={2}>
            <Stack
                position='relative'
                direction='row'
                justifyContent='center'
                alignItems='center'
            >
                <IconButton
                onClick={()=>
                  {
                    dispatch(selectedAndPrevPageResolver(0));
                    setTimeout(()=>navigate('/'), 0);
                  }
                }
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
                Выберете персонажа
            </Box>
            <Autocomplete
            value={Object.keys(selectedCharacter).length ? selectedCharacter : null}
            onChange={(__, newOption)=>{
              if (newOption == null) dispatch(selectedCharacterResolver({}));
              else dispatch(selectedCharacterResolver(newOption));
            }}
            disablePortal
            options={demoUsers}
            renderInput={(params)=><TextField {...params} label="ФИО" className='inputTextField'/>}
            />
            <TextField
                disabled
                className='inputTextField'
                value={selectedCharacter ?  selectedCharacter.year : 'Дата рождения'}
            />
            <Stack direction='row' justifyContent='flex-end'>
                <Button
                disabled={Object.keys(selectedCharacter).length == 0}
                onClick={()=>{
                  console.log(selectedCharacter);
                  if (selectedCharacter.label?.includes('(новый)')) {
                    dispatch(setDisplayNumber(0));
                    dispatch(selectedAndPrevPageResolver(2));
                    setTimeout(()=>navigate('/inputsecond'), 0);
                  }
                  else {
                    dispatch(setDisplayNumber(3));
                    dispatch(selectedAndPrevPageResolver(3));
                    setTimeout(()=>navigate('/main'), 0);
                  }
                }}
                className="actionButton"
                variant="contained"
                endIcon={<ArrowForwardIcon/>}>
                  <Box>Вперед</Box>
                </Button>
            </Stack>
        </Stack>
};