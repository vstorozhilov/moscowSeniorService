import { configureStore, combineReducers } from '@reduxjs/toolkit';
import selectedAndPrevPageReducer from './SelectedAndPrevPage';
import scheduleReducer from './ScheduleConstructor';
import maxTripTimeReducer from './MaxTripTime';

const rootReducer = combineReducers({
    selectedAndPrevPageReducer,
    scheduleReducer,
    maxTripTimeReducer
})

const store = configureStore({
    reducer : rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export default store;