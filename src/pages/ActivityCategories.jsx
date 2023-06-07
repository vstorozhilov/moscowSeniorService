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
        fetchRecs();
        setTimeout(()=>setRecs(recommendations), 500)
    }, []);

    const activityCategoriesId = useAppSelector(state=>state.ActivityCategoriesReducer.map(item=>item.id));

    return <>
        <TransitionGroup
            component={null}
            appear={true}
        >
        {recs.map((item, index)=>(
            <CSSTransition
            timeout={300 + index * 150}
            classNames='recommendationcard'
            key={item}
            unmountOnExit
            >
                <RecommendationCard title={item} index={index} />
            </CSSTransition>
        ))}
        </TransitionGroup>
        {activityCategoriesId.map(id=>{
            return <ActivityCategoryCard key={id} activityCategoryId={id}/>
        })}
    </>
}