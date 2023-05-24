import { useState, useEffect } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  FormControl,
  FormLabel,
  Slider,
  SliderTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageObjectData } from '~/types/stage-object';

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const ArrowSize = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const getArrowLength = () => {
    return selectedObject.points[2];
  };

  const [arrowLength, setArrowLength] = useState(getArrowLength());
  const [pointerLength, setPointerLength] = useState(selectedObject.pointerLength);
  const [pointerWidth, setPointerWidth] = useState(selectedObject.pointerWidth);

  useEffect(() => {
    setArrowLength(getArrowLength());
    setPointerLength(selectedObject.pointerLength);
    setPointerWidth(selectedObject.pointerWidth);
  }, [shapeId]);

  const handleArrowLengthChange = (al: number) => {
    setArrowLength(al);

    updateOne({
      id: shapeId,
      data: { points: [0, 0, al, 0] },
    });
  };

  const handlePointerLengthChange = (pl: number) => {
    setPointerLength(pl);

    updateOne({
      id: shapeId,
      data: { pointerLength: pl },
    });
  };

  const handlePointerWidthChange = (pw: number) => {
    setPointerWidth(pw);

    updateOne({
      id: shapeId,
      data: { pointerWidth: pw },
    });
  };

  return (
    <Box>
      <Menu>
        <MenuButton as={Button}>Size</MenuButton>
        <MenuList paddingX="10px">
          <FormControl>
            <FormLabel htmlFor="arrow-length-slider" fontWeight="normal">
              Arrow length:
            </FormLabel>
            <Slider
              id="arrow-length-slider"
              aria-label="arrow-length-slider"
              value={arrowLength}
              min={15}
              max={selectedObject.width}
              onChange={handleArrowLengthChange}
            >
              <SliderTrack />
              <SliderThumb />
            </Slider>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="pointer-length-slider" fontWeight="normal">
              Pointer length:
            </FormLabel>
            <Slider
              id="pointer-length-slider"
              aria-label="pointer-length-slider"
              value={pointerLength}
              min={15}
              max={selectedObject.width / 2}
              onChange={handlePointerLengthChange}
            >
              <SliderTrack />
              <SliderThumb />
            </Slider>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="pointer-width-slider" fontWeight="normal">
              Pointer width:
            </FormLabel>
            <Slider
              id="pointer-width-slider"
              aria-label="pointer-width-slider"
              value={pointerWidth}
              min={15}
              max={selectedObject.width / 2}
              onChange={handlePointerWidthChange}
            >
              <SliderTrack />
              <SliderThumb />
            </Slider>
          </FormControl>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ArrowSize;
