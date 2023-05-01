import useStageObject from './use-stage-object';
import { useCallback } from 'react';
import Konva from 'konva';

const useDragHandlers = () => {
  const { updateOne } = useStageObject();

  const onDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>, id: string) => {
    e.evt.preventDefault();
    e.evt.stopPropagation();

    const data = e.target.attrs;

    updateOne({ id, data });
    e.target.getLayer().batchDraw();
  }, []);

  return { onDragEnd };
};

export default useDragHandlers;
