import Konva from 'konva';
import { KeyboardEvent, useEffect, useState } from 'react';
import { StageObjectData } from '~/types/stage-object';
import EditableTextInput from './EditableTextInput';
import ResizableText from './ResizableText';

const RETURN_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

type TProps = {
  shapeProps: StageObjectData;
  isSelected: boolean;
  onChange: (text: Konva.TextConfig) => void;
  onSelect: () => void;
};

const EditableText = ({ shapeProps, isSelected, onChange, onSelect }: TProps) => {
  const [x, setX] = useState(shapeProps.x);
  const [y, setY] = useState(shapeProps.y);
  const [text, setText] = useState(shapeProps.text || '');
  const [width, setWidth] = useState(shapeProps.width);
  const [height, setHeight] = useState(shapeProps.height);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isSelected && isEditing) {
      setIsEditing(false);
    }
  }, [isSelected, isEditing]);

  const onToggleEdit = () => {
    if (!isSelected) return;
    setIsEditing(!isEditing);
  };

  const onResize = (newWidth: number, newHeight: number) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  const handleEscapeKeys = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === RETURN_KEY && !e.shiftKey) || e.key === ESCAPE_KEY) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <EditableTextInput
        x={x}
        y={y}
        height={height}
        width={width}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        handleEscapeKeys={handleEscapeKeys}
      />
    );
  }
  return (
    <ResizableText
      x={x}
      y={y}
      width={width}
      text={text}
      isSelected={isSelected}
      onResize={onResize}
      onDragEnd={(e) => {
        onChange({
          // ...textProps,
          x: e.target.x(),
          y: e.target.y(),
        });
        setX(e.target.x());
        setY(e.target.y());
      }}
      onSelect={onSelect}
      onDoubleClick={onToggleEdit}
    />
  );
};

export default EditableText;
