import Konva from 'konva';
import { RefObject, useRef } from 'react';
import useStageObject from './use-stage-object';

const useTransformer = () => {
  const { updateOne } = useStageObject();
  const transformer = useRef() as RefObject<Konva.Transformer>;

  const onTransformerEnd = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const id = e.target.attrs.id;
    const data = e.target.attrs;

    updateOne({ id, data });
    transformer.current?.getStage()?.batchDraw();
  };

  return { transformer, onTransformerEnd };
};

export default useTransformer;
