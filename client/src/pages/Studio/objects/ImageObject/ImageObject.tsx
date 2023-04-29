import { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from '~/consts/images';
import { StageObjectData } from '~/types/stage-object';

type Props = {
  src: string;
  data: StageObjectData;
};

const ImageObject = ({ src, data }: Props) => {
  const [image] = useImage(src);
  const [size, setSize] = useState({ width: MAX_IMAGE_WIDTH, height: MAX_IMAGE_HEIGHT });

  useEffect(() => {
    if (image) {
      const { width, height } = image;
      const ratio = Math.min(MAX_IMAGE_WIDTH / width, MAX_IMAGE_HEIGHT / height);

      setSize({ width: width * ratio, height: height * ratio });
    }
  }, [image]);

  return <KonvaImage image={image} {...data} {...size} />;
};

export default ImageObject;
