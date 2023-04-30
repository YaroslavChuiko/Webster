import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Transformer } from 'react-konva';
import { useAppSelector } from '~/hooks/use-app-selector';
import ImageObject from './objects/ImageObject/ImageObject';
import ShapeObject from './objects/ShapeObject/ShapeObject';
import useStageObject from '~/hooks/use-stage-object';
import { StageObject, StageObjectType } from '~/types/stage-object';
import useTransformer from '~/hooks/use-transformer';
import useObjectSelect from '~/hooks/use-object-select';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const Frame = ({ stageRef }: IProps) => {
  const { stageObjects } = useStageObject();
  const { transformer, onTransformerEnd } = useTransformer();

  const { onObjectSelect } = useObjectSelect({ transformer });

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

  const renderStageObject = (obj: StageObject) => {
    const data = obj.data;
    switch (data.type) {
      case StageObjectType.IMAGE:
        return <ImageObject onSelect={onObjectSelect} obj={obj} />;
      case StageObjectType.SHAPE:
        return <ShapeObject onSelect={onObjectSelect} obj={obj} />;
      default:
        return null;
    }
  };

  return (
    <Stage
      width={width * scale}
      height={height * scale}
      style={{ backgroundColor: 'white' }}
      scaleX={scale}
      scaleY={scale}
      ref={stageRef}
      onClick={onObjectSelect}
    >
      <Layer>
        {stageObjects.map((obj) => (
          <React.Fragment key={obj.id}>{renderStageObject(obj)}</React.Fragment>
        ))}
        <Transformer ref={transformer} onTransformEnd={onTransformerEnd} />
      </Layer>
    </Stage>
  );
};

export default Frame;
