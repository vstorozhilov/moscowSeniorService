import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Text from './svg/text.svg';
import GrandmomOne from './svg/hellopage_grandmom_one.svg';
import GrandmomTwo from './svg/hellopage_grandmom_two.svg';
import GrandDad from './svg/hellopage_granddad.svg';
import PlateOne from './svg/hellopage_plate_one.svg';
import PlateTwo from './svg/hellopage_plate_two.svg';
import PlateThree from './svg/hellopage_plate_three.svg';
import { useAppSelector,
    useAppDispatch
  } from '../stateManager/hooks';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import { useNavigate } from 'react-router-dom';

export default function Hello (props) {

    const nodeRef = useRef(null);
    const { pageIndex } = props;
    const dispatch = useAppDispatch();
    const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
    const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
    const navigate = useNavigate();

    console.log(selectedPageIndex, pageIndex)


    return <Box ref={nodeRef} sx={{
            position : 'absolute',
            width : 'inherit',
            height : 'inherit',
            overflow : 'hidden'
        }}>
            <Box sx={{
            position : 'relative',
            width : 'inherit',
            height : 'inherit',
            overflowY : 'scroll',
            overflowX : 'hidden',
            background: 'linear-gradient(70deg, #cd3931, #ccb280)',
            }}>
        <img style={{
            position: 'absolute',
            top : 450,
            left : -30,
            transform : 'rotate(-30deg)',
            zIndex : 4
        }} src={GrandDad}/>
        <img  src={GrandmomOne}
        style={{
            position: 'absolute',
            top : 30,
            right : -60,
            transform : 'rotate(10deg)'
        }}/>
        <img
        style={{
            position: 'absolute',
            top : 80,
            left : 20
        }}
        src={Text}/>
        <Box sx={{
            paddingTop : 2,
            paddingLeft : 2,
            color : 'white',
            fontSize : 16
        }}
        >Мобильная версия<br></br>вэб-сайта</Box>
        <img src={PlateOne}
        style={{
            position: 'absolute',
            top : 280,
            left : 140,
            transform : 'rotate(-4deg)',
            zIndex : 3,
            opacity : 1,
            backdropFilter: 'blur(10px)'
        }}
        />
        <img
        style={{
            position: 'absolute',
            top : 270,
            left : 30,
            transform : 'rotate(3deg)',
            zIndex : 2,
            backdropFilter: 'blur(10px)'
            // transform : 'rotate(-30deg)'
        }}
        src={PlateTwo}/>
        <img src={PlateThree}
            style={{
                position: 'absolute',
                top : 240,
                left : -10,
                transform : 'rotate(-3deg)',
                zIndex : 1
                // transform : 'rotate(-30deg)'
            }}
        />
        <img src={GrandmomTwo}
            style={{
                position: 'absolute',
                top : 530,
                left : 170,
                transform : 'rotate(10deg)',
                zIndex : 5
            }}
        />
        <Button
        onClick={()=>{
            dispatch(selectedAndPrevPageResolver(1));
            setTimeout(()=>navigate('/inputfirst'), 0);
        }}
        className="actionButton"
        variant="contained"
        endIcon={<ArrowForwardIcon/>}
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 600,
            right : 10
        }}>
            <Box>Вперед</Box>
        </Button>
        </Box>
    </Box>
}