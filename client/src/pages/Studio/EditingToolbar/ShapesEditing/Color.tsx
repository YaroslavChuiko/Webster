import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { stateObjectActions } from '~/store/slices/stage-object-slice';
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
  const dispatch = useDispatch();

  const getGradientColor = (index: number) => {
    if (selectedObject.fillLinearGradientColorStops) {
      return selectedObject.fillLinearGradientColorStops[index];
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
    }
    return 0;
  };

  const [color, setColor] = useState(selectedObject.fill);
  const [color1, setColor1] = useState(getGradientColor(1));
  const [color2, setColor2] = useState(getGradientColor(3));
  const [angle, setAngle] = useState(getAngle());
  const [tabIndex, setTabIndex] = useState(getTabIndex());

  useEffect(() => {
    setColor(selectedObject.fill);
    setColor1(getGradientColor(1));
    setColor2(getGradientColor(3));
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

    dispatch(
      stateObjectActions.updateOne({
        id: selectedObject.id,
        data: { ...selectedObject, fill: rgbaC, fillPriority: 'color', stroke },
      }),
    );
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
      fillLinearGradientStartPoint: { x: x1, y: y1 },
      fillLinearGradientEndPoint: { x: x2, y: y2 },
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
      fillLinearGradientColorStops = [0, color1, 1, color2];
    }
    fillLinearGradientColorStops[index] = getRGBAString(c.rgb);

    dispatch(
      stateObjectActions.updateOne({
        id: selectedObject.id,
        data: {
          ...selectedObject,
          fillPriority: 'linear-gradient',
          ...getLinearCoords(),
          fillLinearGradientColorStops,
        },
      }),
    );
  };

  const handleAngleChange = (a: number) => {
    setAngle(a);
    dispatch(
      stateObjectActions.updateOne({
        id: selectedObject.id,
        data: {
          ...selectedObject,
          fillPriority: 'linear-gradient',
          ...getLinearCoords(a),
          angle: a,
        },
      }),
    );
  };

  return (
    <Menu>
      <MenuButton as={Button}>Color</MenuButton>
      <MenuList padding="0">
        <Tabs index={tabIndex} onChange={setTabIndex}>
          <TabList>
            <Tab>Solid</Tab>
            {selectedObject.shapeType !== ShapeType.ARROW && <Tab>Linear</Tab>}
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
                      <Box w="20px" h="20px" backgroundColor={color1} />
                    </Tab>
                    <Tab>
                      <Box w="20px" h="20px" backgroundColor={color2} />
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <SketchPicker color={color1} onChangeComplete={(c) => handleLinearColorChange(c, 1, setColor1)} />
                    </TabPanel>
                    <TabPanel>
                      <SketchPicker color={color2} onChangeComplete={(c) => handleLinearColorChange(c, 3, setColor2)} />
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
