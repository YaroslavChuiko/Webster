import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Text } from 'react-konva';
import { useAppSelector } from '~/hooks/use-app-selector';

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
      let wScale = (window.innerWidth - toolbar.offsetWidth - containerCenterPaddings) / width;
      let hScale = (window.innerHeight - navbar.offsetHeight - containerCenterPaddings) / height;
      if (wScale < hScale) {
        setScale(wScale);
      } else {
        setScale(hScale);
      }
    }
  }, [width, height]);

  return (
    <Stage
      width={width * scale}
      height={height * scale}
      style={{ backgroundColor: 'white' }}
      scaleX={scale}
      scaleY={scale}
      ref={stageRef}
    >
      <Layer>
        <Text text="Some text" />
      </Layer>
    </Stage>
  );
};

export default Frame;
