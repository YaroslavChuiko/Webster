import { useState, useEffect } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import useStageObject from '~/hooks/use-stage-object';
import { getRGBAString } from '~/utils/get-rgba-string';
import { StageObjectData } from '~/types/stage-object';
import { ShapeType } from '~/types/shape-type';

type IProps = {
  shapeId: string;
  selectedObject: StageObjectData;
};

const SolidColor = ({ shapeId, selectedObject }: IProps) => {
  const { updateOne } = useStageObject();

  const [color, setColor] = useState(selectedObject.fill);

  useEffect(() => {
    setColor(selectedObject.fill);
  }, [shapeId]);

  const handleSolidColorChange = (c: ColorResult) => {
    const rgbaC = getRGBAString(c.rgb);
    setColor(rgbaC);

    let stroke = selectedObject.stroke;
    if (selectedObject.shapeType === ShapeType.ARROW) {
      stroke = rgbaC;
    }

    updateOne({
      id: shapeId,
      data: { fill: rgbaC, fillPriority: 'color', stroke },
    });
  };

  return <SketchPicker color={color} onChangeComplete={handleSolidColorChange} />;
};

export default SolidColor;
