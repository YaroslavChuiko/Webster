import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { RefObject, useEffect, useRef } from 'react';
import { Text, Transformer } from 'react-konva';
import useDragHandlers from '~/hooks/use-drag-handlers';
// import useStageObject from '~/hooks/use-stage-object';
import useObjectSelect from '~/hooks/use-object-select';
import { StageObject } from '~/types/stage-object';

type TProps = {
  shapeProps: StageObject;
  onDoubleClick: (e: KonvaEventObject<MouseEvent>) => void;
  transformer: RefObject<Konva.Transformer>;
  onTransformerEnd: (e: KonvaEventObject<MouseEvent>) => void;
};

const ResizableText = ({ shapeProps, onDoubleClick, transformer, onTransformerEnd }: TProps) => {
  // const { updateOne } = useStageObject();
  const { onDragEnd } = useDragHandlers();
  const { id, data } = shapeProps;

  const textRef = useRef<Konva.Text | null>(null);
  const { onObjectSelect, setSelected, isSelected } = useObjectSelect({ transformer });
  const selected = isSelected(id);
  const onSelect = () => setSelected(id);

  useEffect(() => {
    if (selected) {
      onObjectSelect(textRef.current as Konva.Text);
    }
  }, [selected]);

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
    <>
      <Text
        id={id}
        text={data.text}
        width={data.width}
        x={data.x}
        y={data.y}
        draggable={data.draggable}
        ref={textRef}
        fill="black"
        fontFamily="sans-serif"
        fontSize={24}
        lineHeight={1.2}
        perfectDrawEnabled={true}
        onTransform={handleResize}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => onDragEnd(e, id)}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
      />
      {selected && (
        <Transformer
          ref={transformer}
          onTransformEnd={onTransformerEnd}
          // rotateEnabled={false}
          // flipEnabled={false}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(_oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default ResizableText;
