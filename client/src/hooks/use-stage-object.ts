import { nanoid } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { stageObjectSelector, stateObjectActions } from '~/store/slices/stage-object-slice';
import { StageObject, StageObjectData } from '~/types/stage-object';

const useStageObject = () => {
  const dispatch = useDispatch();
  const stageObjects = useSelector(stageObjectSelector.selectAll);

  const createOne = (data: StageObjectData) => {
    const payload: StageObject = { id: nanoid(), data };
    dispatch(stateObjectActions.addOne(payload));
  };

  const removeOne = (id: string) => {
    dispatch(stateObjectActions.removeOne(id));
  };

  const resetAll = () => {
    dispatch(stateObjectActions.removeAll());
  };

  return {
    stageObjects,
    createOne,
    removeOne,
    resetAll,
  };
};
export default useStageObject;
