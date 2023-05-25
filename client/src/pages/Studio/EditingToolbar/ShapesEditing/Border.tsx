import { useState, useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Switch,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react';
import { SketchPicker, ColorResult } from 'react-color';
import useStageObject from '~/hooks/use-stage-object';
import { getRGBAString } from '~/utils/get-rgba-string';
import { StageObjectData } from '~/types/stage-object';

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const INIT_BORDER_COLOR = '#000000';
const INIT_BORDER_WIDTH = 5;

const Border = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const getIsBorder = () => {
    return !!(selectedObject.stroke && selectedObject.strokeWidth);
  };

  const getBorderWidth = () => {
    return selectedObject.strokeWidth ? selectedObject.strokeWidth : INIT_BORDER_WIDTH;
  };

  const getBorderColor = () => {
    return selectedObject.stroke ? selectedObject.stroke : INIT_BORDER_COLOR;
  };

  const [isBorder, setIsBorder] = useState(getIsBorder());
  const [borderWidth, setBorderWidth] = useState(getBorderWidth());
  const [borderColor, setBorderColor] = useState(getBorderColor());

  useEffect(() => {
    setIsBorder(getIsBorder());
    setBorderWidth(getBorderWidth());
    setBorderColor(getBorderColor());
  }, [shapeId]);

  const handleIsBorderChange = () => {
    setIsBorder(!isBorder);

    let stroke;
    let strokeWidth;

    if (!isBorder) {
      stroke = INIT_BORDER_COLOR;
      strokeWidth = INIT_BORDER_WIDTH;
    } else {
      strokeWidth = 0;
    }

    updateOne({
      id: shapeId,
      data: { stroke, strokeWidth },
    });
  };

  const handleBorderWidthChange = (w: number) => {
    setBorderWidth(w);

    updateOne({
      id: shapeId,
      data: { strokeWidth: w },
    });
  };

  const handleSolidColorChange = (c: ColorResult) => {
    const rgbaC = getRGBAString(c.rgb);
    setBorderColor(rgbaC);

    updateOne({
      id: shapeId,
      data: { stroke: rgbaC },
    });
  };

  return (
    <Box>
      <Menu>
        <MenuButton as={Button}>Border</MenuButton>
        <MenuList paddingX="10px">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="border-switch">Border</FormLabel>
            <Switch id="border-switch" colorScheme="pink" isChecked={isBorder} onChange={handleIsBorderChange} />
          </FormControl>

          {isBorder && (
            <>
              <FormControl>
                <FormLabel htmlFor="border-width-slider" fontWeight="normal">
                  Border width:
                </FormLabel>
                <Slider
                  id="border-width-slider"
                  aria-label="border-width-slider"
                  value={borderWidth}
                  min={1}
                  max={selectedObject.width}
                  onChange={handleBorderWidthChange}
                >
                  <SliderTrack />
                  <SliderThumb />
                </Slider>
              </FormControl>

              <SketchPicker color={borderColor} onChangeComplete={handleSolidColorChange} />
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Border;
