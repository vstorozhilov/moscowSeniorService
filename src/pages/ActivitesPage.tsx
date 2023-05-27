import React, { useRef } from 'react';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CSSTransition } from 'react-transition-group';
import { selectedAndPrevPagesSlice } from '../stateManager/SelectedAndPrevPage';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ActivityCategoryCard from '../components/ActivityCategoryCard';
import { ActivityCategorySlice } from '../stateManager/ActivityCategories';
import { useAppSelector, useAppDispatch } from '../stateManager/hooks';
import ActivityCard from '../components/ActivityCard';

export default function ActivityPage (props) {

  const nodeRef = useRef(null);
  const { pageIndex } = props;
  const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
  const dispatch = useAppDispatch();
  const { selectedAndPrevPageResolver } = selectedAndPrevPagesSlice.actions;

  const activitiesId = useAppSelector(state=>state.ActivityReducer.map(item=>item.id));

  console.log(selectedPageIndex, prevPageIndex, pageIndex);

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
                onClick={()=>dispatch(selectedAndPrevPageResolver(2))}
                sx={{
                    position : 'absolute',
                    left : 0
                }}>
                    <ArrowBackIcon sx={{
                        color : 'black'
                    }}/>
                </IconButton>
                <Box className='mainLabel'>Вам подойдут</Box>
            </Stack>
            {activitiesId.map(id=>{
                return <ActivityCard activityId={id}/>
            })}
        </Stack>
        </CSSTransition>
};