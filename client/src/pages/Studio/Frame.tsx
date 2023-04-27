import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text } from 'react-konva';
import { useAppSelector } from '~/hooks/use-app-selector';
import EditableText from './tools/EditableText/EditableText';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const Frame = ({ stageRef }: IProps) => {
  const [scale, setScale] = useState(1);
  const { width, height } = useAppSelector((state) => state.frame);

  useEffect(() => {
    const containerCenterPaddings = 40;
    const toolbar = document.querySelector('#toolbar') as HTMLElement;
    const navbar = document.querySelector('#navbar') as HTMLElement;
    if (toolbar && navbar) {
      const wScale = (window.innerWidth - toolbar.offsetWidth - containerCenterPaddings) / width;
      const hScale = (window.innerHeight - navbar.offsetHeight - containerCenterPaddings) / height;
      if (wScale < hScale) {
        setScale(wScale);
      } else {
        setScale(hScale);
      }
    }
  }, [width, height]);

  const [text, setText] = useState('Click to resize. Double click to edit.');
  const [selected, setSelected] = useState(false);

  return (
    <Stage
      width={width * scale}
      height={height * scale}
      style={{ backgroundColor: 'white' }}
      scaleX={scale}
      scaleY={scale}
      ref={stageRef}
      onClick={(e) => {
        if (e.target === stageRef?.current?.getStage()) {
          setSelected(false);
        }
      }}
    >
      <Layer>
        <Text text="Some text" />
        <EditableText
          x={50}
          y={50}
          text={text}
          onChange={(value) => setText(value)}
          // width={width}
          // height={height}
          selected={selected}
          // onResize={(newWidth, newHeight) => {
          //   setWidth(newWidth);
          //   setHeight(newHeight);
          // }}
          // onClick={() => {
          //   setSelected(!selected);
          // }}
          onClick={(newSelected) => {
            setSelected(newSelected);
          }}
        />
        <EditableText
          x={250}
          y={250}
          text={text}
          onChange={(value) => setText(value)}
          // width={width}
          // height={height}
          selected={selected}
          // onResize={(newWidth, newHeight) => {
          //   setWidth(newWidth);
          //   setHeight(newHeight);
          // }}
          // onClick={() => {
          //   setSelected(!selected);
          // }}
          onClick={(newSelected) => {
            setSelected(newSelected);
          }}
        />
      </Layer>
    </Stage>
  );
};

export default Frame;
