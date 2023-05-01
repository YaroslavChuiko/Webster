import Konva from 'konva';
import { RefObject, useEffect, useRef, useState } from 'react';
import { Image as KonvaImage, Transformer } from 'react-konva';
import useImage from 'use-image';
import { MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH } from '~/consts/images';
import useDragHandlers from '~/hooks/use-drag-handlers';
import useObjectSelect from '~/hooks/use-object-select';
import useTransformer from '~/hooks/use-transformer';
import { StageImageData, StageObject } from '~/types/stage-object';

type Props = {
  obj: StageObject;
};

const ImageObject = ({ obj }: Props) => {
  const { id, data } = obj;
  const { src, ...props } = data as StageImageData;
  const [image, load] = useImage(src, 'anonymous');
  const [size, setSize] = useState({ width: MAX_IMAGE_WIDTH, height: MAX_IMAGE_HEIGHT });
  const imgRef = useRef() as RefObject<Konva.Image>;

  const { onDragEnd } = useDragHandlers();
  const { transformer, onTransformerEnd } = useTransformer();
  const { isSelected, onObjectSelect, setSelected } = useObjectSelect({ transformer });
  const selected = isSelected(id);

  useEffect(() => {
    if (image && load === 'loaded') {
      const { width, height } = image;
      const ratio = Math.min(MAX_IMAGE_WIDTH / width, MAX_IMAGE_HEIGHT / height);

      setSize({ width: width * ratio, height: height * ratio });
    }
  }, [image]);

  useEffect(() => {
    if (selected) {
      onObjectSelect(imgRef.current as Konva.Image);
    }
  }, [selected]);

  return (
    <>
      <KonvaImage
        id={id}
        ref={imgRef}
        onClick={() => setSelected(id)}
        image={image}
        onDragEnd={(e) => onDragEnd(e, obj.id)}
        {...props}
        {...size}
      />
      {selected && <Transformer ref={transformer} onTransformEnd={onTransformerEnd} />}
    </>
  );
};

export default ImageObject;
