import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef } from 'react';
import { Text, Transformer } from 'react-konva';

type TProps = {
  x: number;
  y: number;
  text: string;
  width: number;
  isSelected: boolean;
  onResize: (width: number, height: number) => void;
  onDoubleClick: (e: KonvaEventObject<MouseEvent>) => void;
  onSelect: () => void;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
};

const ResizableText = ({ x, y, width, text, isSelected, onDragEnd, onSelect, onResize, onDoubleClick }: TProps) => {
  const textRef = useRef<Konva.Text | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current !== null && textRef.current !== null) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleResize = () => {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      const newHeight = textNode.height() * textNode.scaleY();
      textNode.setAttrs({
        width: newWidth,
        // height: newHeight,
        // fontSize: newHeight,
        scaleX: 1,
        scaleY: 1,
      });
      onResize(newWidth, newHeight);
    }
  };

  return (
    <>
      <Text
        text={text}
        width={width}
        x={x}
        y={y}
        draggable={true}
        ref={textRef}
        fill="black"
        fontFamily="sans-serif"
        fontSize={24}
        lineHeight={1.2}
        perfectDrawEnabled={true}
        onTransform={handleResize}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={onDragEnd}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
      />
      {isSelected && (
        <Transformer
          ref={transformerRef}
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
