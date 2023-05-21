import { HStack } from '@chakra-ui/react';
import { StageImageData, StageObject } from '~/types/stage-object';
import ImageFlip from './Flip';
import ImageFilters from './Filters';

type Props = {
  selectedObject: StageObject;
};

const ImageEditing = ({ selectedObject }: Props) => {
  return (
    <HStack spacing={2}>
      <ImageFlip selectedObject={selectedObject} />
      <ImageFilters imageId={selectedObject.id} data={selectedObject.data as StageImageData} />
    </HStack>
  );
};

export default ImageEditing;
