import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CSSTransition } from 'react-transition-group';
import { useAppSelector,
    useAppDispatch
  } from '../stateManager/hooks';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import RecoLogo from '../pages/svg/recoLogo.svg';
import { answerSlice } from '../stateManager/Answers';
import CircularProgress from '@mui/material/CircularProgress';
import { RecommendationSlice } from '../stateManager/Recommendations';
import { ActivityCategorySlice } from '../stateManager/ActivityCategories';
import { useNavigate } from 'react-router-dom';
import { mainTabSlice } from '../stateManager/mainTab';

export default function RecoPageThree (props) {

    const nodeRef = useRef(null);
    const { pageIndex } = props;
    const dispatch = useAppDispatch();
    const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;
    const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
    const { changeAnswer } = answerSlice.actions;
    const { setReco } = RecommendationSlice.actions;
    const { setActivityCategories } = ActivityCategorySlice.actions;
    const userId = useAppSelector(state=>state.SelectedCharacterReducer.id);
    const navigation = useNavigate();
    const { setMainTab } = mainTabSlice.actions;

    const [isLoading, setIsLoading] = useState(false);

    const answers = useAppSelector(state=>state.AnswerReducer);

    const getRecommends = async (activity) => {

        setIsLoading(true);

        let responce = await fetch('https://alexhlins1.fvds.ru:1339/send/', {
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

        responce = await fetch(`https://alexhlins1.fvds.ru:1338/users/${userId}/recommendations/categories`,
            {
                method : 'POST',
                headers : {
                    accept : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(reccomends.recomendation.filter(item=>(item != '')).map(item=>item.replaceAll('"', '').trim()))
            },
        );

        console.log(reccomends.recomendation.filter(item=>(item != '')).map(item=>item.replaceAll('"', '').trim()));
        dispatch(setActivityCategories([]));
        dispatch(setMainTab('activityCategories'));
        setIsLoading(false);
    }


    return <CSSTransition
        timeout={500}
        nodeRef={nodeRef}
        classNames={selectedPageIndex > prevPageIndex ? 'page-transition-forward' : 'page-transition-backward'}
        unmountOnExit
        in={pageIndex == selectedPageIndex}
        key={pageIndex}>
        <>
        {isLoading && <Box sx={{
            position : 'absolute',
            background : 'rgba(0, 0, 0, 0.6)',
            width : '100%',
            height : '100%',
            zIndex : 10
        }}>
        </Box>}
        <Box ref={nodeRef} sx={{
            position : 'absolute',
            width : 'inherit',
            height : 'inherit',
            overflow : 'hidden',
            background : 'rgba(0, 0, 0, 0.8)'
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
        {isLoading ? <CircularProgress
        size={80}
        sx={{
            color : 'white',
            position : 'absolute',
            top : '50vh',
            left : '40vw',
            zIndex : 15
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
            await getRecommends('Активные занятия');
            dispatch(selectedAndPrevPageResolver(3));
            setTimeout(()=>navigation('/main'), 0);
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
            await getRecommends('Cпокойные занятия');
            dispatch(selectedAndPrevPageResolver(3));
            setTimeout(()=>navigation('/main'), 0);
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
        onClick={async ()=>{
            dispatch(selectedAndPrevPageResolver(9));
            setTimeout(()=>navigation('/questiontwo'), 0);
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
    </Box>
    </>
    </CSSTransition>
}