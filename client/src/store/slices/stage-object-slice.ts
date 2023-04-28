import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { StageObject } from '~/types/stage-object';

export const STAGE_OBJECT_SLICE = 'stage';

export const stageObjectEntity = createEntityAdapter<StageObject>();

export const stageObjectSlice = createSlice({
  name: STAGE_OBJECT_SLICE,
  initialState: stageObjectEntity.setAll(stageObjectEntity.getInitialState(), []),
  reducers: {
    addOne(state, { payload }) {
      stageObjectEntity.addOne(state, payload);
    },
    updateOne(state, { payload }) {
      stageObjectEntity.updateOne(state, {
        id: payload.id,
        changes: payload.data,
      });
    },
    removeOne(state, { payload }) {
      stageObjectEntity.removeOne(state, payload);
    },
    removeAll(state) {
      stageObjectEntity.removeAll(state);
    },
  },
});

const stageObjectReducer = stageObjectSlice.reducer;

export const stageObjectSelector = stageObjectEntity.getSelectors((state: RootState) => state.stage);

export const stateObjectActions = stageObjectSlice.actions;
export default stageObjectReducer;
