import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

export const COPIED_OBJECT_SLICE = 'copied';

export const copiedObjectEntity = createEntityAdapter<{ id: string }>();

const initialState: { copied: string[] } = {
  copied: [],
};

export const copiedObjectSlice = createSlice({
  name: COPIED_OBJECT_SLICE,
  initialState,
  reducers: {
    setAll(state, { payload }) {
      state.copied = payload;
    },
  },
});

const copiedObjectReducer = copiedObjectSlice.reducer;

export const copiedObjectActions = copiedObjectSlice.actions;
export default copiedObjectReducer;
