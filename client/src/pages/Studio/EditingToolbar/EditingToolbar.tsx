import { Flex } from '@chakra-ui/react';
import { useAppSelector } from '~/hooks/use-app-selector';
import { stageObjectSelector } from '~/store/slices/stage-object-slice';
import ShapesEditing from './ShapesEditing/ShapesEditing';
import { StageObjectType } from '~/types/stage-object';
import { EDING_TOOLBAR_HEIGHT } from '~/consts/components';

const EditingToolbar = () => {
  const stageObjects = useAppSelector(stageObjectSelector.selectAll);
  const { ids: selected } = useAppSelector((state) => state.selected);

  const getSelectedObject = () => {
    if (selected.length === 1 && stageObjects) {
      return stageObjects.find((obj) => obj.id === selected[0])?.data;
    }
    return null;
  };

  const selectedObject = getSelectedObject();

  const renderEditing = () => {
    switch (selectedObject?.type) {
      case StageObjectType.SHAPE:
        return <ShapesEditing selectedObject={selectedObject} />;
      default:
        return null;
    }
  };

  return (
    <Flex h={`${EDING_TOOLBAR_HEIGHT}px`} id="editing_toolbar" alignItems="center">
      {renderEditing()}
    </Flex>
  );
};

export default EditingToolbar;
