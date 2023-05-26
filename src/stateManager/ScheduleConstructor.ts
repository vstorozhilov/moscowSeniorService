import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface dayTimes {
    morning : boolean,
    afternoon : boolean,
    evening : boolean
};

const initialState: dayTimes[] = [
    {
        morning : false,
        afternoon : false,
        evening : false
    },
    {
        morning : false,
        afternoon : false,
        evening : false
    },
    {
        morning : false,
        afternoon : false,
        evening : false
    },
    {
        morning : false,
        afternoon : false,
        evening : false
    },
    {
        morning : false,
        afternoon : false,
        evening : false
    },
    {
        morning : false,
        afternoon : false,
        evening : false
    },
    {
        morning : false,
        afternoon : false,
        evening : false
    }
];

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    changeSchedule: (prevSchedule, action : PayloadAction<{
        weekday : number,
        dayTimes : string[]
    }>) => {
      const newSchedule = [...prevSchedule];
      const {weekday, dayTimes} = action.payload;

      newSchedule[weekday] = {
        morning : false,
        afternoon : false,
        evening : false
      }
      console.log(dayTimes);
      dayTimes.forEach(daytime=>{newSchedule[weekday][daytime] = true});
      return newSchedule;
    }
  },
})

export default scheduleSlice.reducer