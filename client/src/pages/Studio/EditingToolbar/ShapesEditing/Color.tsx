import { useState, useEffect } from 'react';
import { SketchPicker, ColorResult, RGBColor } from 'react-color';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Slider,
  SliderTrack,
  SliderThumb,
} from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageObjectData } from '~/types/stage-object';
import { ShapeType } from '~/types/shape-type';

type IProps = {
  selectedObject: StageObjectData;
};

const getRGBAString = (rbga: RGBColor) => {
  if (rbga.a) {
    return `rgba(${rbga.r}, ${rbga.g}, ${rbga.b}, ${rbga.a})`;
  }
  return `rgb(${rbga.r}, ${rbga.g}, ${rbga.b})`;
};

const Color = ({ selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const getLinearGradientColor = (index: number) => {
    if (selectedObject.fillLinearGradientColorStops) {
      return selectedObject.fillLinearGradientColorStops[index];
    }
    return selectedObject.fill;
  };

  const getRadialGradientColor = (index: number) => {
    if (selectedObject.fillRadialGradientColorStops) {
      return selectedObject.fillRadialGradientColorStops[index];
    }
    return selectedObject.fill;
  };

  const getAngle = () => (selectedObject.angle ? Number(selectedObject.angle) : 0);

  const getTabIndex = () => {
    switch (selectedObject.fillPriority) {
      case 'color':
        return 0;
      case 'linear-gradient':
        return 1;
      case 'radial-gradient':
        return 2;
    }
    return 0;
  };

  const [color, setColor] = useState(selectedObject.fill);
  const [linearColor1, setLinearColor1] = useState(getLinearGradientColor(1));
  const [linearColor2, setLinearColor2] = useState(getLinearGradientColor(3));
  const [angle, setAngle] = useState(getAngle());
  const [radialColor1, setRadialColor1] = useState(getRadialGradientColor(1));
  const [radialColor2, setRadialColor2] = useState(getRadialGradientColor(3));
  const [tabIndex, setTabIndex] = useState(getTabIndex());

  useEffect(() => {
    setColor(selectedObject.fill);
    setLinearColor1(getLinearGradientColor(1));
    setLinearColor2(getLinearGradientColor(3));
    setAngle(getAngle());
    setTabIndex(getTabIndex());
  }, [selectedObject.id]);

  const handleSolidColorChange = (c: ColorResult) => {
    const rgbaC = getRGBAString(c.rgb);
    setColor(rgbaC);

    let stroke = selectedObject.stroke;
    if (selectedObject.shapeType === ShapeType.ARROW) {
      stroke = rgbaC;
    }

    updateOne({
      id: selectedObject.id,
      data: { fill: rgbaC, fillPriority: 'color', stroke },
    });
  };

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
      id: selectedObject.id,
      data: { fillPriority: 'linear-gradient', ...getLinearCoords(), fillLinearGradientColorStops },
    });
  };

  const handleAngleChange = (a: number) => {
    setAngle(a);

    updateOne({
      id: selectedObject.id,
      data: { fillPriority: 'linear-gradient', ...getLinearCoords(a), angle: a },
    });
  };

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
      id: selectedObject.id,
      data: { fillPriority: 'radial-gradient', ...getRadialCoords(), fillRadialGradientColorStops },
    });
  };

  const handleTabChange = (index: number) => {
    setTabIndex(index);

    let fillPriority;
    switch (index) {
      case 0:
        fillPriority = 'color';
        break;
      case 1:
        fillPriority = 'linear-gradient';
        break;
      case 2:
        fillPriority = 'radial-gradient';
        break;
    }

    updateOne({
      id: selectedObject.id,
      data: { fillPriority },
    });
  };

  return (
    <Menu>
      <MenuButton as={Button}>Color</MenuButton>
      <MenuList padding="0">
        <Tabs index={tabIndex} onChange={handleTabChange}>
          <TabList>
            <Tab>Solid</Tab>
            {selectedObject.shapeType !== ShapeType.ARROW && (
              <>
                <Tab>Linear</Tab>
                <Tab>Radial</Tab>
              </>
            )}
          </TabList>
          <TabPanels>
            <TabPanel>
              <SketchPicker color={color} onChangeComplete={handleSolidColorChange} />
            </TabPanel>
            {selectedObject.shapeType !== ShapeType.ARROW && (
              <TabPanel>
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
              </TabPanel>
            )}
            {selectedObject.shapeType !== ShapeType.ARROW && (
              <TabPanel>
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
                      <SketchPicker
                        color={radialColor1}
                        onChangeComplete={(c) => handleRadialColorChange(c, 1, setRadialColor1)}
                      />
                    </TabPanel>
                    <TabPanel>
                      <SketchPicker
                        color={radialColor2}
                        onChangeComplete={(c) => handleRadialColorChange(c, 3, setRadialColor2)}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </MenuList>
    </Menu>
  );
};

export default Color;
