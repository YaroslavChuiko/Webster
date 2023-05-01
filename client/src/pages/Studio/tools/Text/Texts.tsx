import { Button, VStack } from '@chakra-ui/react';
import { DEFAULT_TEXT_OBJECT } from '~/consts/stage-object';
import useStageObject from '~/hooks/use-stage-object';

const Texts = () => {
  const { createOne } = useStageObject();

  const addTextToStage = () => {
    createOne({
      text: 'Click to resize. Double click to edit.',
      ...DEFAULT_TEXT_OBJECT,
    });
  };

  return (
    <VStack>
      <Button onClick={addTextToStage}>Add Text</Button>
    </VStack>
  );
};

export default Texts;
