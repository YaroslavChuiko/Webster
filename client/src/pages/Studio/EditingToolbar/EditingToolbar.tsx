import { Button, HStack } from '@chakra-ui/react';
import { useAppSelector } from '~/hooks/use-app-selector';
import { stageObjectSelector } from '~/store/slices/stage-object-slice';
import ShapesEditing from './ShapesEditing/ShapesEditing';
import { StageObjectType } from '~/types/stage-object';
import { EDITING_TOOLBAR_HEIGHT } from '~/consts/components';
import TextEditing from './TextEditing/TextEditing';
import ImageEditing from './ImageEditing/ImageEditing';
import useHistory from '~/hooks/use-history';
import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useStageResize from '~/hooks/use-stage-resize';
import { KeyType } from '~/consts/keys';

const EditingToolbar = () => {
  const stageObjects = useAppSelector(stageObjectSelector.selectAll);
  const { selected } = useAppSelector((state) => state.selected);

  const { savePast, goBack, goForward } = useHistory();

  const { setStageSize } = useStageResize({});

  useHotkeys(KeyType.UNDO, (e) => {
    e.preventDefault();
    goBack();
  });

  useHotkeys(KeyType.REDO, (e) => {
    e.preventDefault();
    goForward();
  });

  useEffect(() => {
    savePast(stageObjects);
  }, [stageObjects]);

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
        return <ShapesEditing selectedObject={selectedObject} />;
      case StageObjectType.TEXT:
        return <TextEditing selectedObject={selectedObject} />;
      default:
        return null;
    }
  };

  return (
    <HStack h={`${EDITING_TOOLBAR_HEIGHT}px`} id="editing_toolbar" spacing={2} sx={{ px: 4 }}>
      <Button colorScheme="blue" variant="outline" onClick={() => goBack()}>
        Undo
      </Button>
      <Button colorScheme="blue" variant="outline" onClick={() => goForward()}>
        Redo
      </Button>
      <Button colorScheme="blue" variant="outline" onClick={() => setStageSize()}>
        Reset zoom
      </Button>
      {renderEditing()}
    </HStack>
  );
};

export default EditingToolbar;
