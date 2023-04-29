import { CSSProperties, KeyboardEvent, useEffect, useRef } from 'react';
import { Html } from 'react-konva-utils';
import useStageObject from '~/hooks/use-stage-object';
import { StageObject } from '~/types/stage-object';

type TEditableTextInput = {
  shapeProps: StageObject;
  handleEscapeKeys: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

function getStyle(width: number, height: number) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  const baseStyle: CSSProperties = {
    width: `${width + 10}px`,
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

  if (isFirefox) {
    return baseStyle;
  }
  return {
    ...baseStyle,
    marginTop: '-4px',
  };
}

const EditableTextInput = ({ shapeProps, handleEscapeKeys }: TEditableTextInput) => {
  const { updateOne } = useStageObject();
  const { id, data } = shapeProps;
  const { x, y, width, height, text } = data;
  const style = getStyle(width, height);

  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    updateStyles();
  }, [areaRef.current]);

  const updateStyles = () => {
    if (!areaRef.current) return;
    const textarea = areaRef.current;
    textarea.style.width = `${width}px`;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 24 + 'px';
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    handleEscapeKeys(e);
    updateStyles();
  };

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        ref={areaRef}
        value={text}
        onKeyDown={onKeyDown}
        onChange={(e) => updateOne({ id, data: { text: e.currentTarget.value } })}
        style={style}
        autoFocus
      />
    </Html>
  );
};

export default EditableTextInput;
