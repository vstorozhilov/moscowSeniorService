import React, { useRef, useState } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';

export default function RecoPageThree (props) {

    const nodeRef = useRef(null);
    const { pageIndex } = props;
    const dispatch = useAppDispatch();
    const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
    const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
    const { changeAnswer } = answerSlice.actions;

    const [isLoading, setIsLoading] = useState(false);

    const answers = useAppSelector(state=>state.AnswerReducer);

    const getRecommends = async (activity) => {

        setIsLoading(true);

        let responce = await fetch('http://62.109.9.1:9999/send/', {
                            method : 'POST',
                            headers : {
                                accept : 'application/json',
                                'Content-Type' : 'application/json'
                            },
                            body : JSON.stringify(
                                {
                                "sex_male": true,
                                "age": 60,
                                "health_issue": `Есть проблемы ${answers.health_issue}`,
                                "sociality": `Мне больше нравится заниматься ${answers.sociality}`,
                                "activity": `Мне больше нравятся ${activity}`
                                }
                            )
                        });

        let reccomends = await responce.json();

        setIsLoading(false);
    }


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
            overflow : 'hidden',
            background: 'linear-gradient(70deg, #cd3931, #ccb280)',
            }}>
        <img src={RecoLogo}
            style={{
                position: 'absolute',
                top : 280,
                left : 140,
                transform : 'rotate(-4deg)',
                zIndex : 3,
                // backdropFilter: 'blur(10px)'
            }}
        />
        {isLoading ? <CircularProgress sx={{
            color : 'white',
            position : 'absolute',
            top : '70vh',
            left : '45vw'
        }}/> : null}
        <Box sx={{
            position : 'absolute',
            top : 110,
            left : 30,
            fontSize : 36,
            color : 'white',
            letterSpacing: '-0.015em'
        }}>
            Что вам больше нравится:<br></br>активные или спокойные<br></br>занятия?
        </Box>

        <Button
        disabled={isLoading}
        onClick={async ()=>{
            // await getRecommends('Активные занятия');
            // dispatch(changeAnswer(
            //     {
            //         answer : 'activity',
            //         value : 'Активные занятия'
            //     }
            // ))
            dispatch(selectedAndPrevPageResolver(3))
        }}
        className="actionButton"
        variant="contained"
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 330,
            left : 30
        }}>
            <Box>Активные занятия</Box>
        </Button>
        <Button
        disabled={isLoading}
        onClick={async ()=>{
            // await getRecommends('Cпокойные занятия');
            // dispatch(changeAnswer(
            //     {
            //         answer : 'activity',
            //         value : 'Cпокойные занятия'
            //     }
            // ))
            dispatch(selectedAndPrevPageResolver(3))
        }}
        className="actionButton"
        variant="contained"
        sx={{
            zIndex: 6,
            position: 'absolute',
            top : 380,
            left : 30
        }}>
            <Box>Спокойные занятия</Box>
        </Button>

        <Button
        // disabled={isLoading}
        onClick={()=>dispatch(selectedAndPrevPageResolver(3))}
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