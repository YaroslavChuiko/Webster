import { Image as ChakraImage, SimpleGrid } from '@chakra-ui/react';
import { Photo } from './Images';
import { DEFAULT_IMAGE_OBJECT } from '~/consts/stage-object';
import useStageObject from '~/hooks/use-stage-object';

type Props = {
  images: Photo[];
};

const ImagesGrid = ({ images }: Props) => {
  const { createOne } = useStageObject();

  const addImageToStage = (img: Photo) => {
    createOne({
      src: img.urls.regular,
      ...DEFAULT_IMAGE_OBJECT,
    });
  };

  return (
    <SimpleGrid spacingY={4}>
      {images.map((img, i) => (
        <ChakraImage key={i} src={img.urls.regular} rounded="md" onClick={() => addImageToStage(img)} />
      ))}
    </SimpleGrid>
  );
};

export default ImagesGrid;
