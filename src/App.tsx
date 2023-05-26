import React, { useRef } from 'react';
import Login from './pages/Login';
import SurNameAndBirthDateInput from './pages/SurnameAndBirthDateInput';
import './Appp.scss';
import Hello from './pages/Hello';
import {
  TransitionGroup,
} from 'react-transition-group';
import AddressScheduleAndTripTime from './pages/AddressScheduleAndTripTime';

export default function App() {

    return <TransitionGroup style={{
      height : 'inherit',
      width : 'inherit',
    }}>
        <Hello pageIndex={0}/>
        <SurNameAndBirthDateInput pageIndex={1}/>
        <AddressScheduleAndTripTime pageIndex={2}/>
      </TransitionGroup>
}
