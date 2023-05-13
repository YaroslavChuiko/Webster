import React, { useState, useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Transformer } from 'react-konva';
import { useAppSelector } from '~/hooks/use-app-selector';
import TextObject from './objects/TextObject/TextObject';
import { KonvaEventObject } from 'konva/lib/Node';
import ImageObject from './objects/ImageObject/ImageObject';
import ShapeObject from './objects/ShapeObject/ShapeObject';
import useStageObject from '~/hooks/use-stage-object';
import { StageObject, StageObjectType, StageTextObjectData } from '~/types/stage-object';
import useTransformer from '~/hooks/use-transformer';
import useObjectSelect from '~/hooks/use-object-select';
import { loadGoogleFontsDefaultVariants } from '~/utils/load-google-fonts-default-variants';
import useHotkeySetup from '~/hooks/use-hotkey-setup';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const Frame = ({ stageRef }: IProps) => {
  const { stageObjects } = useStageObject();
  const { transformer: imageTransformer, onTransformerEnd: onImageTransformerEnd } = useTransformer();
  const { transformer: textTransformer, onTransformerEnd: onTextTransformerEnd } = useTransformer();
  const { transformer: multiTransformer, onTransformerEnd: onMultiTransformerEnd } = useTransformer();

  const transformers = { imageTransformer, textTransformer, multiTransformer };

  const { onObjectSelect, resetObjectSelect } = useObjectSelect(transformers);

  useHotkeySetup(transformers);

  const [scale, setScale] = useState(1);
  const { width, height } = useAppSelector((state) => state.frame);

  useEffect(() => {
    const containerCenterPaddings = 40;
    const toolbar = document.querySelector('#toolbar') as HTMLElement;
    const navbar = document.querySelector('#navbar') as HTMLElement;
    const editingToolbar = document.querySelector('#editing_toolbar') as HTMLElement;
    if (toolbar && navbar && editingToolbar) {
      const wScale = (window.innerWidth - toolbar.offsetWidth - containerCenterPaddings) / width;
      const hScale =
        (window.innerHeight - navbar.offsetHeight - editingToolbar.offsetHeight - containerCenterPaddings) / height;
      if (wScale < hScale) {
        setScale(wScale);
      } else {
        setScale(hScale);
      }
    }
  }, [width, height]);

  useEffect(() => {
    const fontsToLoad = stageObjects
      .filter((obj) => obj.data.type === StageObjectType.TEXT && obj.data.font.webFont)
      .map((obj) => obj.data.font.family);

    if (fontsToLoad.length) loadGoogleFontsDefaultVariants(fontsToLoad);

    resetObjectSelect();
  }, []);

  const checkDeselect = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      resetObjectSelect();
    }
  };

  const renderStageObject = (obj: StageObject) => {
    const data = obj.data;
    switch (data.type) {
      case StageObjectType.IMAGE:
        return <ImageObject onSelect={onObjectSelect} obj={obj} />;
      case StageObjectType.TEXT:
        return <TextObject onSelect={onObjectSelect} shapeProps={obj as StageTextObjectData} />;
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
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {stageObjects.map((obj) => (
          <React.Fragment key={obj.id}>{renderStageObject(obj)}</React.Fragment>
        ))}
        <Transformer ref={imageTransformer} onTransformEnd={onImageTransformerEnd} ignoreStroke={true} />
        <Transformer
          ref={textTransformer}
          onTransformEnd={onTextTransformerEnd}
          rotationSnaps={[0, 90, 180, 270]}
          rotateEnabled={true}
          enabledAnchors={['middle-left', 'middle-right']}
          boundBoxFunc={(_oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
        <Transformer
          ref={multiTransformer}
          onTransformEnd={onMultiTransformerEnd}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          boundBoxFunc={(_oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
          ignoreStroke={true}
        />
      </Layer>
    </Stage>
  );
};

export default Frame;
