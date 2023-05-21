import useStageObject from './use-stage-object';
import { useCallback } from 'react';
import Konva from 'konva';
import { StageObject } from '~/types/stage-object';
import useKeyPress from './use-key-press';
import { KeyType } from '~/consts/keys';

const useDragHandlers = () => {
  const { updateOne } = useStageObject();

  const isDragStagePressed = useKeyPress(KeyType.DRAG_STAGE);

  const onDragStart = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    if (isDragStagePressed) {
      e.target.stopDrag();
    }
  }, []);

  const onDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>, obj: StageObject) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();

    const id = obj.id;

    const { x, y, offsetX, offsetY } = e.target.attrs;

    updateOne({
      id,
      data: {
        ...obj.data,
        x,
        y,
        offsetX,
        offsetY,
      },
    });
    e.target.getLayer().batchDraw();
  }, []);

  return { onDragStart, onDragEnd };
};

export default useDragHandlers;
