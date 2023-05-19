import { HStack } from '@chakra-ui/react';
import { useAppSelector } from '~/hooks/use-app-selector';
import { stageObjectSelector } from '~/store/slices/stage-object-slice';
import ShapesEditing from './ShapesEditing/ShapesEditing';
import { StageObjectType } from '~/types/stage-object';
import { EDITING_TOOLBAR_HEIGHT } from '~/consts/components';
import TextEditing from './TextEditing/TextEditing';
import ImageEditing from './ImageEditing/ImageEditing';

const EditingToolbar = () => {
  const stageObjects = useAppSelector(stageObjectSelector.selectAll);
  const { selected } = useAppSelector((state) => state.selected);

  const getSelectedObject = () => {
    if (selected.length === 1 && stageObjects) {
      return stageObjects.find((obj) => obj.id === selected[0]);
    }
    return null;
  };

  const selectedObject = getSelectedObject();

  const renderEditing = () => {
    switch (selectedObject?.data.type) {
      case StageObjectType.IMAGE:
        return <ImageEditing selectedObject={selectedObject} />;
      case StageObjectType.SHAPE:
        return <ShapesEditing selectedObject={selectedObject.data} />;
      case StageObjectType.TEXT:
        return <TextEditing selectedObject={selectedObject.data} />;
      default:
        return null;
    }
  };

  return (
    <HStack h={`${EDITING_TOOLBAR_HEIGHT}px`} id="editing_toolbar" spacing={2}>
      {renderEditing()}
    </HStack>
  );
};

export default EditingToolbar;
