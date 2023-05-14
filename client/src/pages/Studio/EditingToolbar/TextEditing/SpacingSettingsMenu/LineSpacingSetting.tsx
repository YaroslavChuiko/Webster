import {
  Flex,
  NumberInput,
  NumberInputField,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';

type Props = {
  id: string;
  lineHeight: number;
};

const minVal = 0.5;
const maxVal = 2.5;
const step = 0.01;

const LineSpacingSettings = ({ id, lineHeight }: Props) => {
  const { updateOne } = useStageObject();

  const handleInputChange = (valueAsString: string, valueAsNumber: number) => {
    const regex = /^\d\.?\d{1,2}$/;

    if (regex.test(valueAsString) && valueAsNumber >= minVal && valueAsNumber <= maxVal) {
      updateOne({ id, data: { lineHeight: valueAsNumber } });
    }
  };

  const handleSliderChange = (value: number) => {
    updateOne({ id, data: { lineHeight: value } });
  };

  return (
    <VStack pb="10px">
      <Flex w="100%" justify="space-between">
        <Text as="span">Line spacing</Text>
        <NumberInput size="sm" maxW="40px" min={minVal} max={maxVal} value={lineHeight} onChange={handleInputChange}>
          <NumberInputField px="5px" textAlign="center" />
        </NumberInput>
      </Flex>
      <Slider
        focusThumbOnChange={false}
        min={minVal}
        max={maxVal}
        step={step}
        value={lineHeight}
        onChange={handleSliderChange}
      >
        <SliderMark value={1.2} fontSize="sm">
          1.2
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize="15px" />
      </Slider>
    </VStack>
  );
};

export default LineSpacingSettings;
