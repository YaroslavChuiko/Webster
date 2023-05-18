import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, Button, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import AllCorners from './AllCorners';
import SeparateCorners from './SeparateCorners';
import { StageObjectData } from '~/types/stage-object';

type IProps = {
  selectedObject: StageObjectData;
};

const CornerRadius = ({ selectedObject }: IProps) => {
  const getIsSeparateCorners = () => Array.isArray(selectedObject.cornerRadius);

  const [isSeparateCorners, setIsSeparateCorners] = useState(getIsSeparateCorners());

  useEffect(() => {
    setIsSeparateCorners(getIsSeparateCorners());
  }, [selectedObject.id]);

  const handleIsSeparateCornersChange = () => {
    setIsSeparateCorners(!isSeparateCorners);
  };

  return (
    <Menu>
      <MenuButton as={Button}>Corner Radius</MenuButton>
      <MenuList paddingX="10px">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="border-switch">Separate corners</FormLabel>
          <Switch id="border-switch" isChecked={isSeparateCorners} onChange={handleIsSeparateCornersChange} />
        </FormControl>

        {isSeparateCorners ? (
          <SeparateCorners selectedObject={selectedObject} />
        ) : (
          <AllCorners selectedObject={selectedObject} />
        )}
      </MenuList>
    </Menu>
  );
};

export default CornerRadius;
