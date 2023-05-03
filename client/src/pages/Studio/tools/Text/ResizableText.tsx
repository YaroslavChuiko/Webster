import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useRef } from 'react';
import { Text } from 'react-konva';
import useDragHandlers from '~/hooks/use-drag-handlers';
import { StageObject } from '~/types/stage-object';

type TProps = {
  shapeProps: StageObject;
  onDoubleClick: (e: KonvaEventObject<MouseEvent>) => void;
  onSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

const ResizableText = ({ shapeProps, onDoubleClick, onSelect }: TProps) => {
  // const { updateOne } = useStageObject();
  const { onDragEnd } = useDragHandlers();
  const { id, data } = shapeProps;

  const textRef = useRef<Konva.Text | null>(null);

  const handleResize = () => {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      // const newHeight = textNode.height() * textNode.scaleY();
      textNode.setAttrs({
        width: newWidth,
        // height: newHeight,
        // fontSize: newHeight,
        scaleX: 1,
        scaleY: 1,
      });
      // updateOne({ id, data: { width: newWidth, height: newHeight } });
    }
  };

  return (
    <Text
      id={id}
      {...data}
      height={undefined}
      ref={textRef}
      perfectDrawEnabled={true}
      type={data.type}
      onTransform={handleResize}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => onDragEnd(e, id)}
      onDblClick={onDoubleClick}
      onDblTap={onDoubleClick}
    />
  );
};

export default ResizableText;
