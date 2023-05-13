import { StageObjectData } from '~/types/stage-object';
import TextColorPicker from './TextColorPicker';
import FontSizeInput from './FontSizeInput';
import FontStyleSettings from './FontStyleSettings';
import TextDecorationSettings from './TextDecorationSettings';

type Props = {
  selectedObject: StageObjectData;
};

const TextEditing = ({ selectedObject }: Props) => {
  return (
    <>
      <FontSizeInput id={selectedObject.id} fontSize={selectedObject.fontSize} />
      <TextColorPicker selectedObject={selectedObject} />
      <FontStyleSettings id={selectedObject.id} font={selectedObject.font} fontStyle={selectedObject.fontStyle} />
      <TextDecorationSettings id={selectedObject.id} textDecoration={selectedObject.textDecoration} />
    </>
  );
};

export default TextEditing;
