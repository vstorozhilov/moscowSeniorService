import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dayTimes {
    morning : boolean,
    noon : boolean,
    evening : boolean
};

const initialState: dayTimes[] = [
    {
        morning : false,
        noon : false,
        evening : false
    },
    {
        morning : false,
        noon : false,
        evening : false
    },
    {
        morning : false,
        noon : false,
        evening : false
    },
    {
        morning : false,
        noon : false,
        evening : false
    },
    {
        morning : false,
        noon : false,
        evening : false
    },
    {
        morning : false,
        noon : false,
        evening : false
    },
    {
        morning : false,
        noon : false,
        evening : false
    }
];

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    changeSchedule: (prevSchedule, action : PayloadAction<{
        weekday : number,
        dayTime : string
    }>) => {
      const {weekday, dayTime} = action.payload;
      const newSchedule = [...prevSchedule];
      newSchedule[weekday][dayTime] = !newSchedule[weekday][dayTime]
      return newSchedule;
    },
    createSchedule : (prevSchedule, action : PayloadAction<dayTimes[]>) => {
      return { ...action.payload };
    }
  },
})

export default scheduleSlice.reducer