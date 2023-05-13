import { StageObjectData } from '~/types/stage-object';
import TextColorPicker from './TextColorPicker';
import FontSizeInput from './FontSizeInput';

type Props = {
  selectedObject: StageObjectData;
};

const TextEditing = ({ selectedObject }: Props) => {
  return (
    <>
      <FontSizeInput id={selectedObject.id} fontSize={selectedObject.fontSize} />
      <TextColorPicker selectedObject={selectedObject} />
    </>
  );
};

export default TextEditing;
