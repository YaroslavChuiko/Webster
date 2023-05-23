import Color from './Color/Color';
import Border from './Border';
import CornerRadius from './CornerRadius/CornerRadius';
import Shadow from './Shadow';
import StarRadius from './StarRadius';
import ArrowSize from './ArrowSize';
import ArrowPointerPosition from './ArrowPointerPosition';
import { StageObject } from '~/types/stage-object';
import { ShapeType } from '~/types/shape-type';

type IProps = {
  selectedObject: StageObject;
};

const ShapesEditing = ({ selectedObject }: IProps) => {
  return (
    <>
      <Color shapeId={selectedObject.id} selectedObject={selectedObject.data} />
      {selectedObject.data.shapeType !== ShapeType.ARROW && (
        <Border shapeId={selectedObject.id} selectedObject={selectedObject.data} />
      )}
      {selectedObject.data.shapeType === ShapeType.RECT && (
        <CornerRadius shapeId={selectedObject.id} selectedObject={selectedObject.data} />
      )}
      <Shadow shapeId={selectedObject.id} selectedObject={selectedObject.data} />
      {selectedObject.data.shapeType === ShapeType.STAR && (
        <StarRadius shapeId={selectedObject.id} selectedObject={selectedObject.data} />
      )}
      {selectedObject.data.shapeType === ShapeType.ARROW && (
        <ArrowSize shapeId={selectedObject.id} selectedObject={selectedObject.data} />
      )}
      {selectedObject.data.shapeType === ShapeType.ARROW && (
        <ArrowPointerPosition shapeId={selectedObject.id} selectedObject={selectedObject.data} />
      )}
    </>
  );
};

export default ShapesEditing;
