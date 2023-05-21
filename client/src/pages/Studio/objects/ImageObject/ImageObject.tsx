import Konva from 'konva';
import { Image } from 'konva/lib/shapes/Image';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { Image as KonvaImage } from 'react-konva';
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from '~/consts/images';
import useDragHandlers from '~/hooks/use-drag-handlers';
import useImage from '~/hooks/use-image';
import useStageObject from '~/hooks/use-stage-object';
import { StageImageData, StageObject } from '~/types/stage-object';

type Props = {
  obj: StageObject;
  onSelect: (e: Konva.KonvaEventObject<MouseEvent>) => void;
};

const ImageObject = ({ obj, onSelect }: Props) => {
  const { id, data } = obj;
  const { src, filterNames, filterValues, ...props } = data as StageImageData;
  const [image, load] = useImage(src, id);
  const [size, setSize] = useState({ width: MAX_IMAGE_WIDTH, height: MAX_IMAGE_HEIGHT });
  const imgRef = useRef() as RefObject<Image>;

  const filters = useMemo(
    () => (filterNames[0] ? filterNames.map((f) => Konva.Filters[f]).filter((f) => f) : [Konva.Filters.Brighten]),
    [filterNames],
  );

  const cacheOptions = { imageSmoothingEnabled: true, width: size.width, height: size.height };

  const { onDragStart, onDragEnd } = useDragHandlers();
  const { updateOne } = useStageObject();

  useEffect(() => {
    if (image && load === 'loaded') {
      const { width, height } = image;
      const ratio = Math.min(MAX_IMAGE_WIDTH / width, MAX_IMAGE_HEIGHT / height);

      const newSize = { width: width * ratio, height: height * ratio };
      setSize(newSize);
      updateOne({ id, data: newSize });
    }
  }, [image]);

  useEffect(() => {
    if (imgRef.current && filterValues.brighten) {
      imgRef.current.brightness(filterValues.brighten);
    }
    imgRef.current?.filters(filters);
    imgRef.current?.cache(cacheOptions);
  }, [image, data, filterValues, filterNames]);

  return (
    <KonvaImage
      id={id}
      ref={imgRef}
      onClick={onSelect}
      image={image}
      onDragStart={onDragStart}
      onDragEnd={(e) => onDragEnd(e, obj)}
      {...props}
      {...filterValues}
      {...size}
    />
  );
};

export default ImageObject;
