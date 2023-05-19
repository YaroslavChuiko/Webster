import useStageObject from './use-stage-object';
import { useCallback } from 'react';
import Konva from 'konva';
import { StageObject } from '~/types/stage-object';

const useDragHandlers = () => {
  const { updateOne } = useStageObject();

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

  return { onDragEnd };
};

export default useDragHandlers;
