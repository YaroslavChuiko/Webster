import { useState, useEffect } from 'react';
import { FormControl, FormLabel, Slider, SliderTrack, SliderThumb } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageObjectData } from '~/types/stage-object';

const cornerIndexes = {
  topLeft: 0,
  topRight: 1,
  bottomRight: 2,
  bottomLeft: 3,
};

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const SeparateCorners = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const getSeparateCornerRadius = (index: number) => {
    if (selectedObject.cornerRadius === undefined) {
      return 0;
    }
    if (Array.isArray(selectedObject.cornerRadius)) {
      return selectedObject.cornerRadius[index];
    }
    return selectedObject.cornerRadius;
  };

  const [topLeftCornerRadius, setTopLeftCornerRadius] = useState(getSeparateCornerRadius(cornerIndexes.topLeft));
  const [topRightCornerRadius, setTopRightCornerRadius] = useState(getSeparateCornerRadius(cornerIndexes.topRight));
  const [bottomLeftCornerRadius, setBottomLeftCornerRadius] = useState(
    getSeparateCornerRadius(cornerIndexes.bottomLeft),
  );
  const [bottomRightCornerRadius, setBottomRightCornerRadius] = useState(
    getSeparateCornerRadius(cornerIndexes.bottomRight),
  );

  useEffect(() => {
    setTopLeftCornerRadius(getSeparateCornerRadius(cornerIndexes.topLeft));
    setTopRightCornerRadius(getSeparateCornerRadius(cornerIndexes.topRight));
    setBottomLeftCornerRadius(getSeparateCornerRadius(cornerIndexes.bottomLeft));
    setBottomRightCornerRadius(getSeparateCornerRadius(cornerIndexes.bottomRight));
  }, [shapeId]);

  const handleSeparateCornersRadiusChange = (
    r: number,
    index: number,
    setR: (value: React.SetStateAction<number | undefined>) => void,
  ) => {
    setR(r);

    let cornerRadiusArray;
    if (Array.isArray(selectedObject.cornerRadius)) {
      cornerRadiusArray = selectedObject.cornerRadius.slice(0);
    } else {
      const allCornersRadius = selectedObject.cornerRadius !== undefined ? selectedObject.cornerRadius : 0;
      cornerRadiusArray = [allCornersRadius, allCornersRadius, allCornersRadius, allCornersRadius];
    }
    cornerRadiusArray[index] = r;

    updateOne({
      id: shapeId,
      data: { cornerRadius: cornerRadiusArray },
    });
  };

  return (
    <>
      <FormControl>
        <FormLabel htmlFor="top-left-corner-slider" fontWeight="normal">
          Top left corner:
        </FormLabel>
        <Slider
          id="top-left-corner-slider"
          aria-label="top-left-corner-slider"
          value={topLeftCornerRadius}
          min={0}
          max={selectedObject.width / 2}
          onChange={(r) => {
            handleSeparateCornersRadiusChange(r, cornerIndexes.topLeft, setTopLeftCornerRadius);
          }}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="top-right-corner-slider" fontWeight="normal">
          Top right corner:
        </FormLabel>
        <Slider
          id="top-right-corner-slider"
          aria-label="top-right-corner-slider"
          value={topRightCornerRadius}
          min={0}
          max={selectedObject.width / 2}
          onChange={(r) => {
            handleSeparateCornersRadiusChange(r, cornerIndexes.topRight, setTopRightCornerRadius);
          }}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="bottom-left-corner-slider" fontWeight="normal">
          Bottom left corner:
        </FormLabel>
        <Slider
          id="bottom-left-corner-slider"
          aria-label="bottom-left-corner-slider"
          value={bottomLeftCornerRadius}
          min={0}
          max={selectedObject.width / 2}
          onChange={(r) => {
            handleSeparateCornersRadiusChange(r, cornerIndexes.bottomLeft, setBottomLeftCornerRadius);
          }}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="bottom-right-corner-slider" fontWeight="normal">
          Bottom right corner:
        </FormLabel>
        <Slider
          id="bottom-right-corner-slider"
          aria-label="bottom-right-corner-slider"
          value={bottomRightCornerRadius}
          min={0}
          max={selectedObject.width / 2}
          onChange={(r) => {
            handleSeparateCornersRadiusChange(r, cornerIndexes.bottomRight, setBottomRightCornerRadius);
          }}
        >
          <SliderTrack />
          <SliderThumb />
        </Slider>
      </FormControl>
    </>
  );
};

export default SeparateCorners;
