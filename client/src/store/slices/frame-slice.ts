import { createSlice } from '@reduxjs/toolkit';

type IInitialState = {
  width: number;
  height: number;
  scale: number;
};

const initialState: IInitialState = {
  width: 1080,
  height: 1080,
  scale: 1,
};

const frameSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    setSize(state, { payload }) {
      state.width = payload.width;
      state.height = payload.height;
    },
    setScale(state, { payload }) {
      state.scale = payload.scale;
    },
  },
});

export const { setSize, setScale } = frameSlice.actions;
export default frameSlice.reducer;
