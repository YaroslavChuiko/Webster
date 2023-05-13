import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
} from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';

type Props = {
  id: string;
  fontSize: number;
};

const FontSizeInput = ({ id, fontSize }: Props) => {
  const { updateOne } = useStageObject();

  const handleFontSizeChange = (valueAsString: string, valueAsNumber: number) => {
    if (valueAsString.length > 3) return;

    updateOne({
      id,
      data: { fontSize: Number(valueAsNumber) },
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <NumberInput
      size="md"
      maxW={20}
      defaultValue={fontSize}
      min={1}
      max={800}
      step={1}
      pattern="[0-9]{1,3}"
      onKeyPress={handleKeyPress}
      onChange={handleFontSizeChange}
    >
      <Tooltip hasArrow label="Font size" placement="bottom" openDelay={500}>
        <NumberInputField />
      </Tooltip>
      <NumberInputStepper>
        <NumberIncrementStepper>+</NumberIncrementStepper>
        <NumberDecrementStepper>-</NumberDecrementStepper>
      </NumberInputStepper>
    </NumberInput>
  );
};

export default FontSizeInput;
