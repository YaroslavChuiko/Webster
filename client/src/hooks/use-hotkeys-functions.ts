import { useDispatch } from 'react-redux';
import { useAppSelector } from './use-app-selector';
import { stateObjectActions, stageObjectSelector } from '~/store/slices/stage-object-slice';
import { copiedObjectActions, copiedObjectSelector } from '~/store/slices/copied-objects-slice';
import useObjectSelect from './use-object-select';
import useStageObject from './use-stage-object';
import { RefObject } from 'react';
import Konva from 'konva';
import { nanoid } from '@reduxjs/toolkit';

type Props = {
  imageTransformer?: RefObject<Konva.Transformer>;
  textTransformer?: RefObject<Konva.Transformer>;
  multiTransformer?: RefObject<Konva.Transformer>;
};

const useHotkeysFunctions = ({ ...transformers }: Props) => {
  const stageObjects = useAppSelector(stageObjectSelector.selectAll);
  const copiedObjects = useAppSelector(copiedObjectSelector.selectAll);
  const { selected } = useAppSelector((state) => state.selected);
  const { resetObjectSelect } = useObjectSelect(transformers);
  const dispatch = useDispatch();
  const { updateOne } = useStageObject();

  const onDeleteKey = () => {
    if (!selected.length) {
      return;
    }

    dispatch(stateObjectActions.remove(selected));
    resetObjectSelect();
  };

  const onUnselectKey = () => {
    if (!selected.length) {
      return;
    }

    resetObjectSelect();
  };

  const onCopyKey = () => {
    if (!selected.length && !stageObjects) {
      return;
    }

    const selectedObjects = stageObjects
      .filter((obj) => selected.includes(obj.id))
      .map((obj) => {
        const id = nanoid();
        return { id: id, data: { ...obj.data, id } };
      });

    dispatch(copiedObjectActions.setAll(selectedObjects));
  };

  const onPasteKey = () => {
    if (!copiedObjects.length) {
      return;
    }

    dispatch(
      stateObjectActions.addMany(
        copiedObjects.map((obj) => {
          const id = nanoid();
          return { id: id, data: { ...obj.data, id, updatedAt: Date.now() } };
        }),
      ),
    );
  };

  const onCutKey = () => {
    if (!selected.length) {
      return;
    }

    onCopyKey();

    dispatch(stateObjectActions.remove(selected));
    resetObjectSelect();
  };

  const onDuplicateKey = () => {
    if (!selected.length && !stageObjects) {
      return;
    }

    const selectedObjects = stageObjects
      .filter((obj) => selected.includes(obj.id))
      .map((obj) => {
        const id = nanoid();
        return { id: id, data: { ...obj.data, id, updatedAt: Date.now() } };
      });

    dispatch(stateObjectActions.addMany(selectedObjects));
  };

  const onZIndexUpKey = () => {
    if (!selected.length) {
      return;
    }

    stageObjects
      .filter((obj) => selected.includes(obj.id))
      .forEach((obj) => {
        updateOne({
          id: obj.id,
          data: { z_index: 1, updatedAt: Date.now() },
        });
      });
  };

  const onZIndexDownKey = () => {
    if (!selected.length) {
      return;
    }

    stageObjects
      .filter((obj) => selected.includes(obj.id))
      .forEach((obj) => {
        updateOne({
          id: obj.id,
          data: { z_index: -1, updatedAt: Date.now() },
        });
      });
  };

  return {
    onDeleteKey,
    onUnselectKey,
    onCopyKey,
    onPasteKey,
    onCutKey,
    onDuplicateKey,
    onZIndexUpKey,
    onZIndexDownKey,
  };
};

export default useHotkeysFunctions;
