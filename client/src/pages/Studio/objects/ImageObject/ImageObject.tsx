import Konva from 'konva';
import { useEffect, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from '~/consts/images';
import useDragHandlers from '~/hooks/use-drag-handlers';
import { StageImageData, StageObject } from '~/types/stage-object';

type Props = {
  obj: StageObject;
  onSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

const ImageObject = ({ obj, onSelect }: Props) => {
  const { id, data } = obj;
  const { src, ...props } = data as StageImageData;
  const [image, load] = useImage(src, 'anonymous');
  const [size, setSize] = useState({ width: MAX_IMAGE_WIDTH, height: MAX_IMAGE_HEIGHT });

  const { onDragEnd } = useDragHandlers();

  useEffect(() => {
    if (image && load === 'loaded') {
      const { width, height } = image;
      const ratio = Math.min(MAX_IMAGE_WIDTH / width, MAX_IMAGE_HEIGHT / height);

      setSize({ width: width * ratio, height: height * ratio });
    }
  }, [image]);

  return (
    <KonvaImage id={id} onClick={onSelect} image={image} onDragEnd={(e) => onDragEnd(e, obj.id)} {...props} {...size} />
  );
};

export default ImageObject;
