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
  letterSpacing: number;
};

const minVal = -50;
const maxVal = 250;
const step = 1;

const LetterSpacingSettings = ({ id, letterSpacing }: Props) => {
  const { updateOne } = useStageObject();

  const handleInputChange = (valueAsString: string, valueAsNumber: number) => {
    const regex = /^-?\d{1,3}$/;

    if (regex.test(valueAsString) && valueAsNumber >= minVal && valueAsNumber <= maxVal) {
      updateOne({ id, data: { letterSpacing: valueAsNumber } });
    }
  };

  const handleSliderChange = (value: number) => {
    updateOne({ id, data: { letterSpacing: value } });
  };

  return (
    <VStack pb="10px">
      <Flex w="100%" justify="space-between">
        <Text as="span">Letter spacing</Text>
        <NumberInput size="sm" maxW="40px" min={minVal} max={maxVal} value={letterSpacing} onChange={handleInputChange}>
          <NumberInputField px="5px" textAlign="center" />
        </NumberInput>
      </Flex>
      <Slider
        focusThumbOnChange={false}
        min={minVal}
        max={maxVal}
        step={step}
        value={letterSpacing}
        onChange={handleSliderChange}
      >
        <SliderMark value={0} fontSize="sm">
          0
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize="15px" />
      </Slider>
    </VStack>
  );
};

export default LetterSpacingSettings;
