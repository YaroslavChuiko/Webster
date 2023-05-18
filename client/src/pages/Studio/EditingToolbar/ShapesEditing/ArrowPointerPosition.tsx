import { useState, useEffect } from 'react';
import { Menu, MenuButton, MenuList, Button, Switch, FormControl, FormLabel } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageObjectData } from '~/types/stage-object';

type IProps = {
  selectedObject: StageObjectData;
};

const ArrowPointerPosition = ({ selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const [isPointerAtBeginning, setIsRointerAtBeginning] = useState(!!selectedObject.pointerAtBeginning);
  const [isPointerAtEnding, setIsRointerAtEnding] = useState(!!selectedObject.pointerAtEnding);

  useEffect(() => {
    setIsRointerAtBeginning(!!selectedObject.pointerAtBeginning);
    setIsRointerAtEnding(!!selectedObject.pointerAtEnding);
  }, [selectedObject.id]);

  const handleIsPointerAtBeginningChange = () => {
    setIsRointerAtBeginning(!isPointerAtBeginning);

    updateOne({
      id: selectedObject.id,
      data: { pointerAtBeginning: !isPointerAtBeginning },
    });
  };

  const handleIsPointerAtEndingChange = () => {
    setIsRointerAtEnding(!isPointerAtEnding);

    updateOne({
      id: selectedObject.id,
      data: { pointerAtEnding: !isPointerAtEnding },
    });
  };

  return (
    <Menu>
      <MenuButton as={Button}>Pointer position</MenuButton>
      <MenuList paddingX="10px">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="pointer-at-beginning-switch">Pointer at beginning</FormLabel>
          <Switch
            id="pointer-at-beginning-switch"
            isChecked={isPointerAtBeginning}
            onChange={handleIsPointerAtBeginningChange}
          />
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="pointer-at-ending-switch">Pointer at ending</FormLabel>
          <Switch
            id="pointer-at-ending-switch"
            isChecked={isPointerAtEnding}
            onChange={handleIsPointerAtEndingChange}
          />
        </FormControl>
      </MenuList>
    </Menu>
  );
};

export default ArrowPointerPosition;
