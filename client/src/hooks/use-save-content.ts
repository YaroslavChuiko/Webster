import { useUpdateCanvasMutation } from '~/store/api/canvas-slice';
import { useAppSelector } from './use-app-selector';
import { useCallback, useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import useStageObject from './use-stage-object';

const useSaveContent = () => {
  const { stageObjects } = useStageObject();
  const { stage } = useAppSelector((state) => state.frame);
  const [content, setContent] = useState('[]');

  const toast = useToast();

  const [update] = useUpdateCanvasMutation();

  useEffect(() => {
    const objectsJSON = JSON.stringify(stageObjects);
    setContent(objectsJSON);
  }, [stageObjects]);

  const saveHandler = useCallback(() => {
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
  }, [stage, content]);

  return { saveHandler };
};

export default useSaveContent;
