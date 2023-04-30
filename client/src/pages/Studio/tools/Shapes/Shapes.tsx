import { Text } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { DEFAULT_SHAPE_OBJECT } from '~/consts/stage-object';
import { shapesItems, shapeItemType } from './shapes_items';

const Shapes = () => {
  const { createOne } = useStageObject();

  const addImageToStage = (shapeItem: shapeItemType) => {
    createOne({
      ...DEFAULT_SHAPE_OBJECT,
      ...shapeItem,
    });
  };

  return (
    <>
      {shapesItems.map((shapeItem, index) => (
        <Text key={index} onClick={() => addImageToStage(shapeItem)}>
          {shapeItem.name}
        </Text>
      ))}
    </>
  );
};

export default Shapes;
