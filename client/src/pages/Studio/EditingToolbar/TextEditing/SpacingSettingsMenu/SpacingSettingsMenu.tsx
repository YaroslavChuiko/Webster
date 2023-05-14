import { Button, Menu, MenuButton, MenuList, Tooltip } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import CustomNumberInput from './CustomNumberInput';

type Props = {
  id: string;
  letterSpacing: number;
  lineHeight: number;
};

const SpacingSettingsMenu = ({ id, letterSpacing, lineHeight }: Props) => {
  const { updateOne } = useStageObject();

  const onLetterSpacingChange = (value: number) => {
    updateOne({ id, data: { letterSpacing: value } });
  };

  const onLineSpacingChange = (value: number) => {
    updateOne({ id, data: { lineHeight: value } });
  };

  return (
    <Menu>
      <Tooltip hasArrow label="Spacing" placement="bottom" openDelay={500}>
        <MenuButton as={Button} px="5px">
          S
        </MenuButton>
      </Tooltip>
      <MenuList p="15px 30px" minW="300px">
        <CustomNumberInput
          min={-50}
          max={250}
          step={1}
          label="Letter spacing"
          mark={0}
          value={letterSpacing}
          pattern={/^-?\d{1,3}$/}
          onChange={onLetterSpacingChange}
        />
        <CustomNumberInput
          min={0.5}
          max={2.5}
          step={0.01}
          label="Line spacing"
          mark={1.2}
          value={lineHeight}
          pattern={/^\d\.?\d{1,2}$/}
          onChange={onLineSpacingChange}
        />
      </MenuList>
    </Menu>
  );
};

export default SpacingSettingsMenu;
