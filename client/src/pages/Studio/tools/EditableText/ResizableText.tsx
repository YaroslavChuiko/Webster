import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef } from 'react';
import { Text, Transformer } from 'react-konva';

type TProps = {
  x: number;
  y: number;
  text: string;
  isSelected: boolean;
  width: number;
  onResize: (width: number, height: number) => void;
  onClick: (e: KonvaEventObject<Event>) => void;
  onDoubleClick: (e: KonvaEventObject<MouseEvent>) => void;
};

const ResizableText = ({ x, y, text, isSelected, width, onResize, onClick, onDoubleClick }: TProps) => {
  const textRef = useRef<Konva.Text | null>(null);
  const transformerRef = useRef<Konva.Transformer | null>(null);

  useEffect(() => {
    if (isSelected && transformerRef.current !== null && textRef.current !== null) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  function handleResize() {
    if (textRef.current !== null) {
      const textNode = textRef.current;
      const newWidth = textNode.width() * textNode.scaleX();
      const newHeight = textNode.height() * textNode.scaleY();
      textNode.setAttrs({
        width: newWidth,
        scaleX: 1,
      });
      onResize(newWidth, newHeight);
    }
  }

  const transformer = isSelected ? (
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
  ) : null;

  return (
    <>
      <Text
        x={x}
        y={y}
        draggable={true}
        ref={textRef}
        text={text}
        fill="black"
        fontFamily="sans-serif"
        fontSize={24}
        perfectDrawEnabled={false}
        onTransform={handleResize}
        onClick={onClick}
        onTap={onClick}
        onDblClick={onDoubleClick}
        onDblTap={onDoubleClick}
        width={width}
      />
      {transformer}
    </>
  );
};

export default ResizableText;
