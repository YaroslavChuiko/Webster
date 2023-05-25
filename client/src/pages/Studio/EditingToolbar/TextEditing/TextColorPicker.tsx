import { Box, Button, Menu, MenuButton, MenuList, Tooltip } from '@chakra-ui/react';
import { StageObjectData } from '~/types/stage-object';
import SolidColor from '../ShapesEditing/Color/SolidColor';

type Props = {
  id: string;
  selectedObject: StageObjectData;
};

const TextColorPicker = ({ id, selectedObject }: Props) => {
  return (
    <Box>
      <Menu>
        <Tooltip hasArrow label="Text color" placement="bottom" openDelay={500}>
          <MenuButton as={Button} px="5px">
            <Box as="span" fontSize="xl">
              A
            </Box>
            <Box
              as="span"
              borderRadius="md"
              height="5px"
              w="100%"
              m={0}
              bgColor={selectedObject.fill}
              display="block"
            ></Box>
          </MenuButton>
        </Tooltip>
        <MenuList padding="0">
          <SolidColor shapeId={id} selectedObject={selectedObject} />
        </MenuList>
      </Menu>
    </Box>
  );
};

export default TextColorPicker;
