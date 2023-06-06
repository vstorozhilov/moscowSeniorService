import React, { useRef } from 'react';
import Login from './pages/Login';
import SurNameAndBirthDateInput from './pages/SurnameAndBirthDateInput';
import './Appp.scss';
import Hello from './pages/Hello';
import {
  TransitionGroup, SwitchTransition, CSSTransition
} from 'react-transition-group';
import AddressScheduleAndTripTime from './pages/AddressScheduleAndTripTime';
import ActivityCategoriesPage from './pages/MainPage';
import ActivityPage from './pages/ActivitesPage';
import MapPage from './pages/MapPage';
import BookPage from './pages/BookPage';
import SuccessBook from './pages/SuccessBook';
import { useAppSelector } from './stateManager/hooks';
import RecoPageOne from './pages/RecoPageOne';
import RecoPageTwo from './pages/RecoPageTwo';
import RecoPageThree from './pages/RecoPageThree';
import { createBrowserRouter, RouterProvider, useLocation, useOutlet } from 'react-router-dom';

const routes = [
  {
    path : '/',
    element : <Hello pageIndex={0}/>
  },
  {
    path : '/inputfirst',
    element : <SurNameAndBirthDateInput pageIndex={1}/>
  },
  {
    path : '/inputsecond',
    element : <AddressScheduleAndTripTime pageIndex={2}/>
  },
  {
    path : '/main',
    element : <ActivityCategoriesPage pageIndex={3}/>
  },
  // {

  // },
  // {

  // }
];

const rootRoute = [
  {
    path : '/',
    element : <RootPage/>,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })), 

  }
]

function RootPage () {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const {selectedPageIndex, prevPageIndex} = useAppSelector(state=>state.selectedAndPrevPageReducer);
  return <TransitionGroup
  style={{
    height : 'inherit',
    width : 'inherit',
  }}>
    <CSSTransition
      timeout={500}
      classNames={selectedPageIndex > prevPageIndex ? 'page-transition-forward' : 'page-transition-backward'}
      key={location.pathname}
    >
      {currentOutlet}
    </CSSTransition>
  </TransitionGroup>
}

const router = createBrowserRouter(rootRoute);

export default function App() {

    const { selectedPageIndex } = useAppSelector(state=>state.selectedAndPrevPageReducer);

    return <TransitionGroup style={{
      height : 'inherit',
      width : 'inherit',
    }}>
      <RouterProvider router={router}/>
      {/* { selectedPageIndex == 0 ? <Hello pageIndex={0}/> : null}
      { selectedPageIndex == 1 ? <SurNameAndBirthDateInput pageIndex={1}/> : null}
      { selectedPageIndex == 2 ? <AddressScheduleAndTripTime pageIndex={2}/> : null}
      { selectedPageIndex == 3 ? <ActivityCategoriesPage pageIndex={3}/> : null}
      { selectedPageIndex == 4 ? <ActivityPage pageIndex={4}/> : null}
      { selectedPageIndex == 5 ? <MapPage pageIndex={5}/> : null}
      { selectedPageIndex == 6 ? <BookPage pageIndex={6}></BookPage> : null}
      { selectedPageIndex == 7 ? <SuccessBook pageIndex={7}></SuccessBook> : null}
      { selectedPageIndex == 8 ? <RecoPageOne pageIndex={8}></RecoPageOne> : null}
      { selectedPageIndex == 9 ? <RecoPageTwo pageIndex={9}></RecoPageTwo> : null}
      { selectedPageIndex == 10 ? <RecoPageThree pageIndex={10}></RecoPageThree> : null} */}
    </TransitionGroup>
}
