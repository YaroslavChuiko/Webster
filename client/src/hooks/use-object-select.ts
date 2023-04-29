import Konva from 'konva';
import { RefObject } from 'react';

type Props = {
  transformer: RefObject<Konva.Transformer>;
};

const useObjectSelect = ({ transformer }: Props) => {
  const onObjectSelect = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const target = e.target;

    if (!target) {
      return;
    }

    if (e.target.getType() === 'Stage') {
      transformer.current?.nodes([]);
      transformer.current?.getLayer()?.batchDraw();
      return;
    }

    transformer.current?.nodes([target]);
    transformer.current?.getLayer()?.batchDraw();
  };

  return { onObjectSelect };
};

export default useObjectSelect;
