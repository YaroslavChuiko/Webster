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

const INIT_SHADOW_COLOR = '#000000';
const INIT_SHADOW_OFFSET = 5;

const Shadow = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const getIsShadow = () => {
    return !!selectedObject.shadowEnabled;
  };

  const getShadowOffsetX = () => {
    return selectedObject.shadowOffsetX ? selectedObject.shadowOffsetX : INIT_SHADOW_OFFSET;
  };

  const getShadowOffsetY = () => {
    return selectedObject.shadowOffsetY ? selectedObject.shadowOffsetY : INIT_SHADOW_OFFSET;
  };

  const getShadowBlur = () => {
    return selectedObject.shadowBlur ? selectedObject.shadowBlur : INIT_SHADOW_OFFSET;
  };

  const getShadowColor = () => {
    return selectedObject.shadowColor ? selectedObject.shadowColor : INIT_SHADOW_COLOR;
  };

  const [isShadow, setIsShadow] = useState(getIsShadow());
  const [shadowOffsetX, setShadowOffsetX] = useState(getShadowOffsetX());
  const [shadowOffsetY, setShadowOffsetY] = useState(getShadowOffsetY());
  const [shadowBlur, setShadowBlur] = useState(getShadowBlur());
  const [shadowColor, setShadowColor] = useState(getShadowColor());

  useEffect(() => {
    setIsShadow(getIsShadow());
    setShadowOffsetX(getShadowOffsetX());
    setShadowOffsetY(getShadowOffsetY());
    setShadowBlur(getShadowBlur());
    setShadowColor(getShadowColor());
  }, [shapeId]);

  const handleIsShadowChange = () => {
    setIsShadow(!isShadow);

    updateOne({
      id: shapeId,
      data: { shadowEnabled: !isShadow, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor },
    });
  };

  const handleShadowOffsetXChange = (x: number) => {
    setShadowOffsetX(x);

    updateOne({
      id: shapeId,
      data: { shadowOffsetX: x },
    });
  };

  const handleShadowOffsetYChange = (y: number) => {
    setShadowOffsetY(y);

    updateOne({
      id: shapeId,
      data: { shadowOffsetY: y },
    });
  };

  const handleShadowBlurChange = (b: number) => {
    setShadowBlur(b);

    updateOne({
      id: shapeId,
      data: { shadowBlur: b },
    });
  };

  const handleColorChange = (c: ColorResult) => {
    const rgbaC = getRGBAString(c.rgb);
    setShadowColor(rgbaC);

    updateOne({
      id: shapeId,
      data: { shadowColor: rgbaC },
    });
  };

  return (
    <Box>
      <Menu>
        <MenuButton as={Button}>Shadow</MenuButton>
        <MenuList paddingX="10px" overflowY="auto" maxH="400px">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="shadow-switch">Shadow</FormLabel>
            <Switch colorScheme="pink" id="shadow-switch" isChecked={isShadow} onChange={handleIsShadowChange} />
          </FormControl>

          {isShadow && (
            <>
              <FormControl>
                <FormLabel htmlFor="shadow-offset-x-slider" fontWeight="normal">
                  Shadow offset x:
                </FormLabel>
                <Slider
                  id="shadow-offset-x-slider"
                  aria-label="shadow-offset-x-slider"
                  value={shadowOffsetX}
                  min={-selectedObject.width}
                  max={selectedObject.width}
                  onChange={handleShadowOffsetXChange}
                >
                  <SliderTrack />
                  <SliderThumb />
                </Slider>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="shadow-offset-y-slider" fontWeight="normal">
                  Shadow offset y:
                </FormLabel>
                <Slider
                  id="shadow-offset-y-slider"
                  aria-label="shadow-offset-y-slider"
                  value={shadowOffsetY}
                  min={-selectedObject.height}
                  max={selectedObject.height}
                  onChange={handleShadowOffsetYChange}
                >
                  <SliderTrack />
                  <SliderThumb />
                </Slider>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="shadow-blur-slider" fontWeight="normal">
                  Shadow blur:
                </FormLabel>
                <Slider
                  id="shadow-blur-slider"
                  aria-label="shadow-blur-slider"
                  value={shadowBlur}
                  min={0}
                  max={selectedObject.width}
                  onChange={handleShadowBlurChange}
                >
                  <SliderTrack />
                  <SliderThumb />
                </Slider>
              </FormControl>

              <SketchPicker color={shadowColor} onChangeComplete={handleColorChange} />
            </>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Shadow;
