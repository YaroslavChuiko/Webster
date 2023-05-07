import Color from './Color';
import { StageObjectData } from '~/types/stage-object';

type IProps = {
  selectedObject: StageObjectData;
};

const ShapesEditing = ({ selectedObject }: IProps) => {
  return (
    <>
      <Color selectedObject={selectedObject} />
    </>
  );
};

export default ShapesEditing;
