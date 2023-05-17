import { StageObjectData } from '~/types/stage-object';
import TextColorPicker from './TextColorPicker';
import FontSizeInput from './FontSizeInput';
import FontStyleSettings from './FontStyleSettings';
import TextDecorationSettings from './TextDecorationSettings';
import TextAlignment from './TextAlignment';
import SpacingSettingsMenu from './SpacingSettingsMenu/SpacingSettingsMenu';
import FontFamilyMenu from './FontFamilyMenu/FontFamilyMenu';

type Props = {
  selectedObject: StageObjectData;
};

const TextEditing = ({ selectedObject }: Props) => {
  return (
    <>
      <FontFamilyMenu id={selectedObject.id} fontFamily={selectedObject.fontFamily} />
      <FontSizeInput id={selectedObject.id} fontSize={selectedObject.fontSize} />
      <TextColorPicker selectedObject={selectedObject} />
      <FontStyleSettings
        id={selectedObject.id}
        fontVariants={selectedObject.fontVariants}
        fontStyle={selectedObject.fontStyle}
        webFont={selectedObject.webFont}
      />
      <TextDecorationSettings id={selectedObject.id} textDecoration={selectedObject.textDecoration} />
      <TextAlignment id={selectedObject.id} textAlign={selectedObject.align} />
      <SpacingSettingsMenu
        id={selectedObject.id}
        letterSpacing={selectedObject.letterSpacing}
        lineHeight={selectedObject.lineHeight}
      />
    </>
  );
};

export default TextEditing;
