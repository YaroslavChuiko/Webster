import Color from './Color/Color';
import Border from './Border';
import CornerRadius from './CornerRadius/CornerRadius';
import Shadow from './Shadow';
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
      {selectedObject.shapeType === ShapeType.RECT && <CornerRadius selectedObject={selectedObject} />}
      <Shadow selectedObject={selectedObject} />
    </>
  );
};

export default ShapesEditing;
