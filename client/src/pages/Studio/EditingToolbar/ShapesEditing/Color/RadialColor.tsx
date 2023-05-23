import { useState, useEffect } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { getRGBAString } from '~/utils/get-rgba-string';
import { StageObjectData } from '~/types/stage-object';
import { ShapeType } from '~/types/shape-type';

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const RadialColor = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const getRadialGradientColor = (index: number) => {
    if (selectedObject.fillRadialGradientColorStops) {
      return selectedObject.fillRadialGradientColorStops[index];
    }
    return selectedObject.fill;
  };

  const [radialColor1, setRadialColor1] = useState(getRadialGradientColor(1));
  const [radialColor2, setRadialColor2] = useState(getRadialGradientColor(3));

  useEffect(() => {
    setRadialColor1(getRadialGradientColor(1));
    setRadialColor2(getRadialGradientColor(3));
  }, [shapeId]);

  const getRadialCoords = () => {
    if (selectedObject.shapeType === ShapeType.RECT) {
      return {
        fillRadialGradientStartPointX: selectedObject.width / 2,
        fillRadialGradientStartPointY: selectedObject.height / 2,
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndPointX: selectedObject.width / 2,
        fillRadialGradientEndPointY: selectedObject.height / 2,
        fillRadialGradientEndRadius: selectedObject.width * 0.75,
      };
    }

    return {
      fillRadialGradientStartPointX: 0,
      fillRadialGradientStartPointY: 0,
      fillRadialGradientStartRadius: 0,
      fillRadialGradientEndPointX: 0,
      fillRadialGradientEndPointY: 0,
      fillRadialGradientEndRadius: selectedObject.radius * 1.5,
    };
  };

  const handleRadialColorChange = (
    c: ColorResult,
    index: number,
    setC: (value: React.SetStateAction<string | undefined>) => void,
  ) => {
    setC(getRGBAString(c.rgb));

    let fillRadialGradientColorStops;
    if (selectedObject.fillRadialGradientColorStops) {
      fillRadialGradientColorStops = selectedObject.fillRadialGradientColorStops.slice(0);
    } else {
      fillRadialGradientColorStops = [0, radialColor1, 1, radialColor2];
    }
    fillRadialGradientColorStops[index] = getRGBAString(c.rgb);

    updateOne({
      id: shapeId,
      data: { fillPriority: 'radial-gradient', ...getRadialCoords(), fillRadialGradientColorStops },
    });
  };

  return (
    <Tabs>
      <TabList>
        <Tab>
          <Box w="20px" h="20px" backgroundColor={radialColor1} />
        </Tab>
        <Tab>
          <Box w="20px" h="20px" backgroundColor={radialColor2} />
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SketchPicker color={radialColor1} onChangeComplete={(c) => handleRadialColorChange(c, 1, setRadialColor1)} />
        </TabPanel>
        <TabPanel>
          <SketchPicker color={radialColor2} onChangeComplete={(c) => handleRadialColorChange(c, 3, setRadialColor2)} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RadialColor;
