import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const SELECTED_OBJECT_SLICE = 'selected';

export const selectedObjectEntity = createEntityAdapter<{ id: string }>();

const initialState: { ids: string[] } = {
  ids: [],
};

export const selectedObjectSlice = createSlice({
  name: SELECTED_OBJECT_SLICE,
  initialState,
  reducers: {
    setAll(state, { payload }) {
      state.ids = payload;
    },
    addOne(state, { payload }) {
      state.ids = [...state.ids, payload];
    },
    removeOne(state, { payload }) {
      state.ids = state.ids.filter((id) => id === payload);
    },
    resetAll(state) {
      state.ids = [];
    },
  },
});

const selectedObjectReducer = selectedObjectSlice.reducer;

export const selectedObjectActions = selectedObjectSlice.actions;
export default selectedObjectReducer;
