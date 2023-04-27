import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  width: number;
  height: number;
};

const initialState: IInitialState = {
  width: 1080,
  height: 1080,
};

const frameSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    setSize(state, { payload }) {
      state.width = payload.width;
      state.height = payload.height;
    },
  },
});

export const { setSize } = frameSlice.actions;
export default frameSlice.reducer;
