import { KeyboardEvent, useEffect, useState } from 'react';
import { StageObject } from '~/types/stage-object';
import EditableTextInput from './EditableTextInput';
import ResizableText from './ResizableText';
import useTransformer from '~/hooks/use-transformer';
import useObjectSelect from '~/hooks/use-object-select';

const RETURN_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

type TProps = {
  shapeProps: StageObject;
};

const EditableText = ({ shapeProps }: TProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const { transformer, onTransformerEnd } = useTransformer();
  const { isSelected } = useObjectSelect({ transformer });
  const selected = isSelected(shapeProps.id);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    }
  }, [selected, isEditing]);

  const onToggleEdit = () => {
    if (!selected) return;
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
    <ResizableText
      onTransformerEnd={onTransformerEnd}
      transformer={transformer}
      shapeProps={shapeProps}
      onDoubleClick={onToggleEdit}
    />
  );
};

export default EditableText;
