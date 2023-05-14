import { Button, Menu, MenuButton, MenuList, Tooltip } from '@chakra-ui/react';
import LetterSpacingSettings from './LetterSpacingSettings';
import LineSpacingSettings from './LineSpacingSetting';

type Props = {
  id: string;
  letterSpacing: number;
  lineHeight: number;
};

const SpacingSettingsMenu = ({ id, letterSpacing, lineHeight }: Props) => {
  return (
    <Menu>
      <Tooltip hasArrow label="Spacing" placement="bottom" openDelay={500}>
        <MenuButton as={Button} px="5px">
          S
        </MenuButton>
      </Tooltip>
      <MenuList p="15px 30px" minW="300px">
        <LetterSpacingSettings id={id} letterSpacing={letterSpacing} />
        <LineSpacingSettings id={id} lineHeight={lineHeight} />
      </MenuList>
    </Menu>
  );
};

export default SpacingSettingsMenu;
