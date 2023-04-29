/* eslint-disable jsx-a11y/no-autofocus */
import { CSSProperties, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { Html } from 'react-konva-utils';

type TEditableTextInput = {
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleEscapeKeys: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

// function getStyle(textNode: Konva.Text) {
//   const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

//   const rotation = textNode.rotation();
//   const px = isFirefox ? 2 + Math.round(textNode.fontSize() / 20) : 0;
//   const transform = rotation ? `rotateZ(${rotation}deg) translateY(-${px}px)` : `translateY(-${px}px)`;

//   const baseStyle = {
//     width: `${textNode.width() - textNode.padding() * 2}px`,
//     height: `${textNode.height() - textNode.padding() * 2 + 5}px`,
//     // position: 'absolute',
//     // top: `${textNode.y()}px`,
//     // left: `${textNode.x()}px`,
//     fontSize: `${textNode.fontSize()}px`,
//     border: 'none',
//     padding: '0px',
//     margin: '0px',
//     overflow: 'hidden',
//     background: 'none',
//     outline: 'none',
//     resize: 'none',
//     lineHeight: textNode.lineHeight(),
//     fontFamily: textNode.fontFamily(),
//     transformOrigin: 'left top',
//     // textAlign: textNode.align(),
//     color: textNode.fill(),
//     transform,
//   };

//   return baseStyle;
// }

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

const EditableTextInput = ({ x, y, width, height, value, onChange, handleEscapeKeys }: TEditableTextInput) => {
  const style = getStyle(width, height);

  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    updateStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <textarea ref={areaRef} value={value} onKeyDown={onKeyDown} onChange={onChange} style={style} autoFocus />
    </Html>
  );
};

export default EditableTextInput;
