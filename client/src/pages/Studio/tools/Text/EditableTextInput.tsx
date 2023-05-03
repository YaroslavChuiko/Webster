import { CSSProperties, KeyboardEvent } from 'react';
import { Html } from 'react-konva-utils';
import TextareaAutosize from 'react-textarea-autosize';
import useStageObject from '~/hooks/use-stage-object';
import { StageObject } from '~/types/stage-object';

type TEditableTextInput = {
  shapeProps: StageObject;
  handleEscapeKeys: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

function getStyle(width: number, height: number) {
  const baseStyle: CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    border: 'none',
    padding: '0px',
    margin: '0px',
    background: 'none',
    outline: 'none',
    overflow: 'hidden',
    resize: 'none',
    color: 'black',
    fontSize: '24px',
    lineHeight: 1.2,
    fontFamily: 'sans-serif',
  };

  return baseStyle;
}

const EditableTextInput = ({ shapeProps, handleEscapeKeys }: TEditableTextInput) => {
  const { updateOne } = useStageObject();
  const { id, data } = shapeProps;
  const { x, y, width, height, text } = data;
  const style = getStyle(width, height);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    handleEscapeKeys(e);
  };

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <TextareaAutosize
        cacheMeasurements
        value={text}
        onKeyDown={onKeyDown}
        onChange={(e) => updateOne({ id, data: { text: e.target.value } })}
        style={style as any}
        autoFocus
      />
    </Html>
  );
};

export default EditableTextInput;
