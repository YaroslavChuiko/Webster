import { useState, useEffect } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Slider, SliderTrack, SliderThumb } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { getRGBAString } from '~/utils/get-rgba-string';
import { StageObjectData } from '~/types/stage-object';
import { ShapeType } from '~/types/shape-type';

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const LinearColor = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const getLinearGradientColor = (index: number) => {
    if (selectedObject.fillLinearGradientColorStops) {
      return selectedObject.fillLinearGradientColorStops[index];
    }
    return selectedObject.fill;
  };

  const getAngle = () => (selectedObject.angle ? Number(selectedObject.angle) : 0);

  const [linearColor1, setLinearColor1] = useState(getLinearGradientColor(1));
  const [linearColor2, setLinearColor2] = useState(getLinearGradientColor(3));
  const [angle, setAngle] = useState(getAngle());

  useEffect(() => {
    setLinearColor1(getLinearGradientColor(1));
    setLinearColor2(getLinearGradientColor(3));
    setAngle(getAngle());
  }, [shapeId]);

  const getLinearCoords = (a?: number) => {
    let width = selectedObject.width / 2;
    let height = selectedObject.height / 2;
    if (selectedObject.shapeType === ShapeType.RECT) {
      width = selectedObject.width;
      height = selectedObject.height;
    }

    const curAngle = a ? a : angle;
    const angleRad = ((180 - curAngle) / 180) * Math.PI;
    const length = Math.abs(width * Math.sin(angleRad)) + Math.abs(height * Math.cos(angleRad));

    const halfx = (Math.sin(angleRad) * length) / 2;
    const halfy = (Math.cos(angleRad) * length) / 2;
    const cx = width / 2;
    const cy = height / 2;
    let x1 = cx - halfx;
    let y1 = cy - halfy;
    let x2 = cx + halfx;
    let y2 = cy + halfy;

    if (selectedObject.shapeType !== ShapeType.RECT) {
      const halfRadius = selectedObject.radius / 2;
      x1 -= halfRadius;
      y1 -= halfRadius;
      x2 -= halfRadius;
      y2 -= halfRadius;
    }

    return {
      fillLinearGradientStartPointX: x1,
      fillLinearGradientStartPointY: y1,
      fillLinearGradientEndPointX: x2,
      fillLinearGradientEndPointY: y2,
    };
  };

  const handleLinearColorChange = (
    c: ColorResult,
    index: number,
    setC: (value: React.SetStateAction<string | undefined>) => void,
  ) => {
    setC(getRGBAString(c.rgb));

    let fillLinearGradientColorStops;
    if (selectedObject.fillLinearGradientColorStops) {
      fillLinearGradientColorStops = selectedObject.fillLinearGradientColorStops.slice(0);
    } else {
      fillLinearGradientColorStops = [0, linearColor1, 1, linearColor2];
    }
    fillLinearGradientColorStops[index] = getRGBAString(c.rgb);

    updateOne({
      id: shapeId,
      data: { fillPriority: 'linear-gradient', ...getLinearCoords(), fillLinearGradientColorStops },
    });
  };

  const handleAngleChange = (a: number) => {
    setAngle(a);

    updateOne({
      id: shapeId,
      data: { fillPriority: 'linear-gradient', ...getLinearCoords(a), angle: a },
    });
  };

  return (
    <>
      <Slider aria-label="angle-slider" value={angle} min={0} max={360} onChange={handleAngleChange}>
        <SliderTrack />
        <SliderThumb />
      </Slider>
      <Tabs>
        <TabList>
          <Tab>
            <Box w="20px" h="20px" backgroundColor={linearColor1} />
          </Tab>
          <Tab>
            <Box w="20px" h="20px" backgroundColor={linearColor2} />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SketchPicker
              color={linearColor1}
              onChangeComplete={(c) => handleLinearColorChange(c, 1, setLinearColor1)}
            />
          </TabPanel>
          <TabPanel>
            <SketchPicker
              color={linearColor2}
              onChangeComplete={(c) => handleLinearColorChange(c, 3, setLinearColor2)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default LinearColor;
