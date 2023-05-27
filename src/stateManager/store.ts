import { configureStore, combineReducers } from '@reduxjs/toolkit';
import selectedAndPrevPageReducer from './SelectedAndPrevPage';
import scheduleReducer from './ScheduleConstructor';
import maxTripTimeReducer from './MaxTripTime';
import ActivityCategoriesReducer from './ActivityCategories';
import ActivityReducer from './Activities';
import ActivitiesMapReducer from './ActivitiesMap';

const rootReducer = combineReducers({
    selectedAndPrevPageReducer,
    scheduleReducer,
    maxTripTimeReducer,
    ActivityCategoriesReducer,
    ActivityReducer,
    ActivitiesMapReducer
})

const store = configureStore({
    reducer : rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store;