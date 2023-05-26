import React, { useRef } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import { IMaskInput } from 'react-imask';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormControl from '@mui/material/FormControl';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector,
    useAppDispatch
  } from '../stateManager/hooks';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MaxTripTimeSelector from '../components/MaxTripTImeSelector';
import ScheduleConstructor from '../components/ScheduleConstructor';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

  const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
      const { onChange, ...other } = props;
      return (
        <IMaskInput
          {...other}
          mask="+7 (9##) ###-####"
          definitions={{
            '#': /[0-9]/,
          }}
          inputRef={ref}
          onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
          overwrite
        />
      );
    },
  );

  const persons = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 }
  ]

export default function AddressScheduleAndTripTime (props) {

  const nodeRef = useRef(null);
  const { pageIndex } = props;
  const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
  const dispatch = useAppDispatch();
  const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
  console.log(selectedPageIndex, prevPageIndex, pageIndex);

  const [alignment, setAlignment] = React.useState('left');
  const [weekday, setWeekday] = React.useState('Пн');
  const [dayTime, setDayTime] = React.useState({
    morning : false,
    afternoon : false,
    evening : false
  });

  const handleWeekday = (
    event: React.MouseEvent<HTMLElement>,
    newWeekday: string | null
  ) => {
    if (newWeekday != null) {
      setWeekday(newWeekday);
    }
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return <CSSTransition
      timeout={500}
      nodeRef={nodeRef}
      classNames={selectedPageIndex > prevPageIndex ? 'page-transition-forward' : 'page-transition-backward'}
      unmountOnExit
      in={pageIndex == selectedPageIndex}
      key={pageIndex}>
        <Stack ref={nodeRef} className='mainContainer' spacing={2}>
            <Stack
                position='relative'
                direction='row'
                justifyContent='center'
                alignItems='center'
            >
                <IconButton
                onClick={()=>dispatch(selectedAndPrevPageResolver(1))}
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
            <Autocomplete
            disablePortal
            options={persons}
            renderInput={(params)=><TextField {...params} label="Адрес" className='inputTextField'/>}
            />
              <MaxTripTimeSelector/>
              <ScheduleConstructor/>
            <Stack direction='row' justifyContent='flex-end'>
                <Button className="actionButton" variant="contained" endIcon={<ArrowForwardIcon/>}>
                  <Box>Вперед</Box>
                </Button>
            </Stack>
        </Stack>
        </CSSTransition>
};