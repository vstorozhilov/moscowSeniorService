import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControl from '@mui/material/FormControl';
import Text from './svg/text.svg';
import GrandmomOne from './svg/hellopage_grandmom_one.svg';
import GrandmomTwo from './svg/hellopage_grandmom_two.svg';
import GrandDad from './svg/hellopage_granddad.svg';
import PlateOne from './svg/hellopage_plate_one.svg';
import PlateTwo from './svg/hellopage_plate_two.svg';
import PlateThree from './svg/hellopage_plate_three.svg';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector,
    useAppDispatch
  } from '../stateManager/hooks';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import RecoLogo from '../pages/svg/recoLogo.svg';
import { answerSlice } from '../stateManager/Answers';
import { useNavigate } from 'react-router-dom';

export default function RecoPageOne (props) {

    const nodeRef = useRef(null);
    const { pageIndex } = props;
    const dispatch = useAppDispatch();
    const { changeAnswer } = answerSlice.actions;
    const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
    const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
    const navigation = useNavigate();


    return <CSSTransition
        timeout={500}
        nodeRef={nodeRef}
        classNames={selectedPageIndex > prevPageIndex ? 'page-transition-forward' : 'page-transition-backward'}
        unmountOnExit
        in={pageIndex == selectedPageIndex}
        key={pageIndex}>
        <Box ref={nodeRef} sx={{
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
        <img src={RecoLogo}
            style={{
                position: 'absolute',
                top : 280,
                left : 140,
                transform : 'rotate(-4deg)',
                zIndex : 3,
            }}
        />
        <Box sx={{
            position : 'absolute',
            top : 120,
            left : 40,
            fontSize : 36,
            color : 'white',
            letterSpacing: '-0.015em'
        }}>
            Есть ли<br></br>у вас проблемы<br></br>со здоровьем?
        </Box>

        <Button
        onClick={()=>{
            dispatch(changeAnswer(
                {
                    answer : 'health_issue',
                    value : 'C cердечно-сосудистой системой'
                }
            ))
            dispatch(selectedAndPrevPageResolver(9));
            setTimeout(()=>navigation('/questiontwo'), 0);
        }}
        className="actionButton"
        variant="contained"
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 280,
            left : 30
        }}>
            <Box>C cердечно-сосудистой системой</Box>
        </Button>
        <Button
        onClick={()=>{
            dispatch(changeAnswer(
                {
                    answer : 'health_issue',
                    value : 'С опорно-двигательным аппаратом'
                }
            ))
            dispatch(selectedAndPrevPageResolver(9));
            setTimeout(()=>navigation('/questiontwo'), 0);
        }}
        className="actionButton"
        variant="contained"
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 330,
            left : 30
        }}>
            <Box>С опорно-двигательным аппаратом</Box>
        </Button>
        <Button
        onClick={()=>{
            dispatch(changeAnswer(
                {
                    answer : 'health_issue',
                    value : 'Со слухом'
                }
            ))
            dispatch(selectedAndPrevPageResolver(9));
            setTimeout(()=>navigation('/questiontwo'), 0);
        }}
        className="actionButton"
        variant="contained"
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 380,
            left : 30
        }}>
            <Box>Co cлухом</Box>
        </Button>
        <Button
        onClick={()=>{
            dispatch(changeAnswer(
                {
                    answer : 'health_issue',
                    value : 'Со зрением'
                }
            ))
            dispatch(selectedAndPrevPageResolver(9));
            setTimeout(()=>navigation('/questiontwo'), 0);
        }}
        className="actionButton"
        variant="contained"
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 380,
            left : 130
        }}>
            <Box>Со зрением</Box>
        </Button>

        <Button
        onClick={()=>{
            dispatch(changeAnswer(
                {
                    answer : 'health_issue',
                    value : 'Проблем нет'
                }
            ))
            dispatch(selectedAndPrevPageResolver(9));
            setTimeout(()=>navigation('/questiontwo'), 0);
        }}
        className="actionButton"
        variant="contained"
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 430,
            left : 30
        }}>
            <Box>Проблем нет</Box>
        </Button>

        <Button
        onClick={()=>{
            dispatch(selectedAndPrevPageResolver(3));
            setTimeout(()=>navigation('/main'), 0);
        }}
        className="actionButton"
        variant="contained"
        startIcon={<ArrowBackIcon/>}
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 600,
            right : 10
        }}>
            <Box>Назад</Box>
        </Button>
        </Box>
    </Box></CSSTransition>
}