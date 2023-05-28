import React, { useRef } from 'react';
import Login from './pages/Login';
import SurNameAndBirthDateInput from './pages/SurnameAndBirthDateInput';
import './Appp.scss';
import Hello from './pages/Hello';
import {
  TransitionGroup,
} from 'react-transition-group';
import AddressScheduleAndTripTime from './pages/AddressScheduleAndTripTime';
import ActivityCategoriesPage from './pages/MainPage';
import ActivityPage from './pages/ActivitesPage';
import MapPage from './pages/MapPage';
import BookPage from './pages/bookPage';
import SuccessBook from './pages/SuccessBook';
import { useAppSelector } from './stateManager/hooks';

export default function App() {

    const { selectedPageIndex } = useAppSelector(state=>state.selectedAndPrevPageReducer);

    return <TransitionGroup style={{
      height : 'inherit',
      width : 'inherit',
    }}>
      { selectedPageIndex == 0 ? <Hello pageIndex={0}/> : null}
      { selectedPageIndex == 1 ? <SurNameAndBirthDateInput pageIndex={1}/> : null}
      { selectedPageIndex == 2 ? <AddressScheduleAndTripTime pageIndex={2}/> : null}
      { selectedPageIndex == 3 ? <ActivityCategoriesPage pageIndex={3}/> : null}
      { selectedPageIndex == 4 ? <ActivityPage pageIndex={4}/> : null}
      { selectedPageIndex == 5 ? <MapPage pageIndex={5}/> : null}
      { selectedPageIndex == 6 ? <BookPage pageIndex={6}></BookPage> : null}
      { selectedPageIndex == 7 ? <SuccessBook pageIndex={7}></SuccessBook> : null}
    </TransitionGroup>
}
