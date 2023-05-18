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
} from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageObjectData } from '~/types/stage-object';

type IProps = {
  selectedObject: StageObjectData;
};

const StarRadius = ({ selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const [innerRadius, setInnerRadius] = useState(selectedObject.innerRadius);

  useEffect(() => {
    setInnerRadius(selectedObject.innerRadius);
  }, [selectedObject.id]);

  const handleInnerRadiusChange = (ir: number) => {
    setInnerRadius(ir);

    updateOne({
      id: selectedObject.id,
      data: { innerRadius: ir },
    });
  };

  return (
    <Menu>
      <MenuButton as={Button}>Raduis</MenuButton>
      <MenuList paddingX="10px">
        <FormControl>
          <FormLabel htmlFor="inner-radius-slider" fontWeight="normal">
            Inner radius:
          </FormLabel>
          <Slider
            id="inner-radius-slider"
            aria-label="inner-radius-slider"
            value={innerRadius}
            min={5}
            max={selectedObject.outerRadius}
            onChange={handleInnerRadiusChange}
          >
            <SliderTrack />
            <SliderThumb />
          </Slider>
        </FormControl>
      </MenuList>
    </Menu>
  );
};

export default StarRadius;
