import { ChangeEvent, useEffect, useState } from 'react';
import ResizableText from './ResizableText';
// import { EditableTextInput } from "./EditableTextInput";

const RETURN_KEY = '13';
const ESCAPE_KEY = '27';

type TProps = {
  x: number;
  y: number;
  selected: boolean;
  // onToggleEdit: (e: KonvaEventObject<MouseEvent>) => void;
  // onToggleTransform: (e: KonvaEventObject<Event>) => void;
  onChange: (text: string) => void;
  // onResize: (width: number, height: number) => void;
  onClick: (isEditing: boolean) => void;
  text: string;
  // width: number;
  // height: number;
};

const EditableText = ({ x, y, selected, onChange, onClick, text }: TProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [width, setWidth] = useState(200);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [height, setHeight] = useState(200);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
  }, [selected, isEditing, isTransforming]);

  function onToggleEdit() {
    setIsEditing(!isEditing);
    onClick(!isEditing);
  }

  function onToggleTransform() {
    setIsTransforming(!isTransforming);
    onClick(!isTransforming);
  }

  function onResize(newWidth: number, newHeight: number) {
    setWidth(newWidth);
    setHeight(newHeight);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleEscapeKeys(e: KeyboardEvent) {
    if ((e.key === RETURN_KEY && !e.shiftKey) || e.key === ESCAPE_KEY) {
      onToggleEdit();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleTextChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.currentTarget.value);
  }

  // if (isEditing) {
  //   return (
  //     <EditableTextInput
  //       x={x}
  //       y={y}
  //       width={width}
  //       height={height}
  //       value={text}
  //       onChange={handleTextChange}
  //       onKeyDown={handleEscapeKeys}
  //     />
  //   );
  // }
  return (
    <ResizableText
      x={x}
      y={y}
      isSelected={isTransforming}
      onClick={onToggleTransform}
      onDoubleClick={onToggleEdit}
      onResize={onResize}
      text={text}
      width={width}
    />
  );
};

export default EditableText;
