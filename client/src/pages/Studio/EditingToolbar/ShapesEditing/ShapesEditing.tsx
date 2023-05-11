import Color from './Color/Color';
import Border from './Border';
import CornerRadius from './CornerRadius/CornerRadius';
import Shadow from './Shadow';
import StarRadius from './StarRadius';
import ArrowSize from './ArrowSize';
import ArrowPointerPosition from './ArrowPointerPosition';
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
      {selectedObject.shapeType === ShapeType.STAR && <StarRadius selectedObject={selectedObject} />}
      {selectedObject.shapeType === ShapeType.ARROW && <ArrowSize selectedObject={selectedObject} />}
      {selectedObject.shapeType === ShapeType.ARROW && <ArrowPointerPosition selectedObject={selectedObject} />}
    </>
  );
};

export default ShapesEditing;
