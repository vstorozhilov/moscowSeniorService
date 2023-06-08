import React, { useEffect, useState } from 'react';
import ActivityCategoryCard from '../components/ActivityCategoryCard';
import { useAppSelector, useAppDispatch } from '../stateManager/hooks';
import { ActivityCategorySlice } from '../stateManager/ActivityCategories';
import RecommendationCard from '../components/RecommendationPlate';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


export default function ActivityCategories(props) {

    const dispatch = useAppDispatch();
    const userId = useAppSelector(state=>state.SelectedCharacterReducer.id);
    const { setActivityCategories } = ActivityCategorySlice.actions;
    const [ recs, setRecs ] = useState([]);
    const recommendations = useAppSelector(state=>state.RecommendationReducer);

    console.log(recommendations)

    const fetchRecs = async () => {
        const responce = await fetch(`https://alexhlins1.fvds.ru:1338/users/${userId}/recommendations/categories`);
        const resJSON = await responce.json();

        dispatch(setActivityCategories(resJSON.map((item, index)=>{
            item.id = index;
            return item;
        })));
    }

    useEffect(()=>{
        setTimeout(()=>fetchRecs(), 0);
        setTimeout(()=>setRecs(recommendations), 500)
    }, []);

    const activityCategoriesId = useAppSelector(state=>state.ActivityCategoriesReducer.map(item=>item.id));

    return <>
        <TransitionGroup
            component={null}
        >
        {activityCategoriesId.map((id, index)=>{
            return  <CSSTransition
            timeout={500 + index * 200}
            classNames='activityCategoryCard'
            key={id}
            unmountOnExit
            >
                <ActivityCategoryCard key={id} activityCategoryId={id} index={index}/>
            </CSSTransition>
        })}
        </TransitionGroup>
    </>
}