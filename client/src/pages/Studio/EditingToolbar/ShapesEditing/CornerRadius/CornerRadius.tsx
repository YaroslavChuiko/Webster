import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, Button, Switch, FormControl, FormLabel, Box } from '@chakra-ui/react';
import AllCorners from './AllCorners';
import SeparateCorners from './SeparateCorners';
import { StageObjectData } from '~/types/stage-object';

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const CornerRadius = ({ shapeId, selectedObject }: IProps) => {
  const getIsSeparateCorners = () => Array.isArray(selectedObject.cornerRadius);

  const [isSeparateCorners, setIsSeparateCorners] = useState(getIsSeparateCorners());

  useEffect(() => {
    setIsSeparateCorners(getIsSeparateCorners());
  }, [shapeId]);

  const handleIsSeparateCornersChange = () => {
    setIsSeparateCorners(!isSeparateCorners);
  };

  return (
    <Box>
      <Menu>
        <MenuButton as={Button}>Corner Radius</MenuButton>
        <MenuList paddingX="10px">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="border-switch">Separate corners</FormLabel>
            <Switch id="border-switch" isChecked={isSeparateCorners} onChange={handleIsSeparateCornersChange} />
          </FormControl>

          {isSeparateCorners ? (
            <SeparateCorners shapeId={shapeId} selectedObject={selectedObject} />
          ) : (
            <AllCorners shapeId={shapeId} selectedObject={selectedObject} />
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default CornerRadius;
