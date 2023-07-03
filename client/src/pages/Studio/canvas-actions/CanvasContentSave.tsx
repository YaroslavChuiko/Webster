import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import DrawerWrapper from '~/components/Drawer/DrawerWrapper';
import { useAppSelector } from '~/hooks/use-app-selector';
import CanvasCreateForm from './CanvasCreateForm';
import useStageObject from '~/hooks/use-stage-object';
import { useEffect, useState } from 'react';
import { useUpdateCanvasMutation } from '~/store/api/canvas-slice';

const CanvasContentSave = () => {
  const { stageObjects } = useStageObject();
  const [content, setContent] = useState('[]');
  const { stage } = useAppSelector((state) => state.frame);

  const [update, { isLoading }] = useUpdateCanvasMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const objectsJSON = JSON.stringify(stageObjects);
    setContent(objectsJSON);
  }, [stageObjects]);

  const saveHandler = () => {
    if (!stage.id) {
      toast({
        title: 'Please create new stage first.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });

      onOpen();
      return;
    }

    const stageValues = {
      id: stage.id as string,
      name: stage.name as string,
      description: stage.description as string,
    };

    update({ ...stageValues, content })
      .then(() => {
        toast({
          title: 'Changes were successfully saved.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button isLoading={isLoading} onClick={saveHandler}>
        Save Changes
      </Button>
      <DrawerWrapper title="Create a stage" isOpen={isOpen} onClose={onClose}>
        <CanvasCreateForm content={content} />
      </DrawerWrapper>
    </>
  );
};

export default CanvasContentSave;
