import Color from './Color';
import Border from './Border';
import { StageObjectData } from '~/types/stage-object';
import { ShapeType } from '~/types/shape-type';

type IProps = {
  selectedObject: StageObjectData;
};

const ShapesEditing = ({ selectedObject }: IProps) => {
  return (
    <>
      <Color selectedObject={selectedObject} />
      {selectedObject.shapeType !== ShapeType.ARROW && <Border selectedObject={selectedObject} />}
    </>
  );
};

export default ShapesEditing;
