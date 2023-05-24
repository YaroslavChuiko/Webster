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

type Props = {
  min: number;
  max: number;
  value: number;
  step: number;
  pattern?: RegExp;
  mark?: number;
  label: string;
  onChange: (val: number) => void;
};

const CustomNumberInput = ({ min, max, step, value, pattern = /^\d$/, mark, label, onChange }: Props) => {
  const handleInputChange = (valueAsString: string, valueAsNumber: number) => {
    if (pattern.test(valueAsString) && valueAsNumber >= min && valueAsNumber <= max) {
      onChange(valueAsNumber);
    }
  };

  return (
    <VStack pb="10px">
      <Flex w="100%" justify="space-between">
        <Text as="span">{label}</Text>
        <NumberInput size="sm" maxW="40px" min={min} max={max} value={value} onChange={handleInputChange}>
          <NumberInputField px="5px" textAlign="center" />
        </NumberInput>
      </Flex>
      <Slider
        colorScheme="pink"
        focusThumbOnChange={false}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
      >
        {typeof mark === 'number' && (
          <SliderMark value={mark} fontSize="sm">
            {mark}
          </SliderMark>
        )}
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize="15px" />
      </Slider>
    </VStack>
  );
};

export default CustomNumberInput;
