import { Button, VStack } from '@chakra-ui/react';
// import { useEffect } from 'react';
import { DEFAULT_TEXT_OBJECT } from '~/consts/stage-object';
import useStageObject from '~/hooks/use-stage-object';
import { StageTextData } from '~/types/stage-object';

const headingStyles: Partial<StageTextData> = {
  text: 'Add a heading',
  fontSize: 78,
  width: 600,
  fontStyle: 'bold',
};

const subheadingStyles: Partial<StageTextData> = {
  text: 'Add a subheading',
  fontSize: 44,
  width: 400,
  fontStyle: 'bold',
};

const bodyTextStyles: Partial<StageTextData> = {
  text: 'Add a little bit of body text',
  fontSize: 30,
  width: 400,
  fontStyle: 'normal',
};

const Texts = () => {
  const { createOne } = useStageObject();

  const addTextToStage = (options: Partial<StageTextData> = {}) => {
    createOne({
      ...DEFAULT_TEXT_OBJECT,
      ...options,
    });
  };

  return (
    <VStack>
      <Button onClick={() => addTextToStage()}>Add a text box</Button>
      <Button onClick={() => addTextToStage(headingStyles)}>Add a heading</Button>
      <Button onClick={() => addTextToStage(subheadingStyles)}>Add a subheading</Button>
      <Button onClick={() => addTextToStage(bodyTextStyles)}>Add a little bit of body text</Button>
    </VStack>
  );
};

export default Texts;
