import { Image, SimpleGrid } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { DEFAULT_SHAPE_OBJECT } from '~/consts/stage-object';
import { shapesItems, shapeItemType } from './shapes_items';

const Shapes = () => {
  const { createOne } = useStageObject();

  const addShapeToStage = (shapeItem: shapeItemType) => {
    createOne({
      ...DEFAULT_SHAPE_OBJECT,
      ...shapeItem,
    });
  };

  return (
    <SimpleGrid columns={3} spacing={10}>
      {shapesItems.map((shapeItem, index) => (
        <Image
          key={index}
          src={shapeItem.src}
          alt={shapeItem.name}
          onClick={() => addShapeToStage(shapeItem)}
          cursor="pointer"
        />
      ))}
    </SimpleGrid>
  );
};

export default Shapes;
