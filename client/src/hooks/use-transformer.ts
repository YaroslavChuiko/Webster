import Konva from 'konva';
import { RefObject, useRef } from 'react';
import useStageObject from './use-stage-object';
import { useAppSelector } from './use-app-selector';

type Props = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const useTransformer = ({ stageRef }: Props) => {
  const { updateOne } = useStageObject();
  const transformer = useRef() as RefObject<Konva.Transformer>;
  const { selected } = useAppSelector((state) => state.selected);

  const onTransformerEnd = () => {
    const selectedNodes = stageRef?.current?.find((node: Konva.Node) => {
      return selected.includes(node.attrs.id);
    });

    if (selectedNodes) {
      selectedNodes.forEach((node: Konva.Node) => {
        const id = node.attrs.id;
        const data = node.attrs;
        updateOne({ id, data });
      });
    }

    transformer.current?.getStage()?.batchDraw();
  };

  return { transformer, onTransformerEnd };
};

export default useTransformer;
