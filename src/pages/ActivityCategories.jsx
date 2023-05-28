import React, { useRef } from 'react';
import ActivityCategoryCard from '../components/ActivityCategoryCard';
import { useAppSelector, useAppDispatch } from '../stateManager/hooks';

export default function ActivityCategories(props) {

    const activityCategoriesId = useAppSelector(state=>state.ActivityCategoriesReducer.map(item=>item.id));

    return <>
        {activityCategoriesId.map(id=>{
            return <ActivityCategoryCard activityCategoryId={id}/>
        })}
    </>
}