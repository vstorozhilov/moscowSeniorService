import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

export const GigachatAnswerSlice = createSlice({
  name: 'gigachatQuestions',
  initialState,
  reducers: {
    setGigachatAnswer: (prev : string[], action : PayloadAction<{
      index : number,
      text : string
    }>) => {
      const {index, text} = action.payload;
      if (index < prev.length) prev[index] = text;
      else prev.push(text)
      return prev;
    }
  },
});

export default GigachatAnswerSlice.reducer;