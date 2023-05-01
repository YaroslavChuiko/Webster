import { KeyboardEvent, useEffect, useState } from 'react';
import { StageObject } from '~/types/stage-object';
import EditableTextInput from './EditableTextInput';
import ResizableText from './ResizableText';
import { KonvaEventObject } from 'konva/lib/Node';

const RETURN_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

type TProps = {
  shapeProps: StageObject;
  isSelected: boolean;
  onSelect: (e: KonvaEventObject<MouseEvent>) => void;
};

const EditableText = ({ shapeProps, isSelected, onSelect }: TProps) => {
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

  const handleEscapeKeys = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === RETURN_KEY && !e.shiftKey) || e.key === ESCAPE_KEY) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return <EditableTextInput shapeProps={shapeProps} handleEscapeKeys={handleEscapeKeys} />;
  }
  return (
    <ResizableText shapeProps={shapeProps} isSelected={isSelected} onSelect={onSelect} onDoubleClick={onToggleEdit} />
  );
};

export default EditableText;
