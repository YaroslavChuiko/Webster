import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const SELECTED_OBJECT_SLICE = 'selected';

export const selectedObjectEntity = createEntityAdapter<{ id: string }>();

//array of ids
const initialState: { selected: string[] } = {
  selected: [],
};

export const selectedObjectSlice = createSlice({
  name: SELECTED_OBJECT_SLICE,
  initialState,
  reducers: {
    setAll(state, { payload }) {
      state.selected = payload;
    },
    addOne(state, { payload }) {
      state.selected = [...state.selected, payload];
    },
    removeOne(state, { payload }) {
      state.selected = state.selected.filter((id) => id !== payload);
    },
    resetAll(state) {
      state.selected = [];
    },
  },
});

const selectedObjectReducer = selectedObjectSlice.reducer;

export const selectedObjectActions = selectedObjectSlice.actions;
export default selectedObjectReducer;
