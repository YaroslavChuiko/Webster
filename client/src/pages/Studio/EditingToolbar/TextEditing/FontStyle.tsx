import { Button, Tooltip } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageTextData } from '~/types/stage-object';

type Props = {
  id: string;
  font: StageTextData['font'];
  fontStyle: StageTextData['fontStyle'];
};

const FontStyle = ({ id, font, fontStyle }: Props) => {
  const { updateOne } = useStageObject();
  const { variants, webFont } = font;

  const isBoldAvailable = !variants.includes('700') && webFont;
  const isItalicAvailable = !variants.includes('italic') && webFont;

  const isBoldActive = fontStyle.includes('bold');
  const isItalicActive = fontStyle.includes('italic');

  const handleBoldClick = () => {
    let newFontStyle: StageTextData['fontStyle'] = fontStyle;

    switch (fontStyle) {
      case 'normal':
        newFontStyle = 'bold';
        break;
      case 'italic':
        newFontStyle = 'italic bold';
        break;
      case 'bold':
        newFontStyle = 'normal';
        break;
      case 'italic bold':
        newFontStyle = 'italic';
        break;
      default:
        break;
    }

    updateOne({ id, data: { fontStyle: newFontStyle } });
  };

  const handleItalicClick = () => {
    let newFontStyle: StageTextData['fontStyle'] = fontStyle;

    switch (fontStyle) {
      case 'normal':
        newFontStyle = 'italic';
        break;
      case 'italic':
        newFontStyle = 'normal';
        break;
      case 'bold':
        newFontStyle = 'italic bold';
        break;
      case 'italic bold':
        newFontStyle = 'bold';
        break;
      default:
        break;
    }

    updateOne({ id, data: { fontStyle: newFontStyle } });
  };
  // !! set icon for bold and italic instead of B and I
  return (
    <>
      <Tooltip hasArrow label="Bold" placement="bottom" openDelay={500}>
        <Button
          isActive={isBoldActive}
          fontWeight="bold"
          fontSize="xl"
          onClick={handleBoldClick}
          isDisabled={isBoldAvailable}
        >
          B
        </Button>
      </Tooltip>
      <Tooltip hasArrow label="Italics" placement="bottom" openDelay={500}>
        <Button
          isActive={isItalicActive}
          fontStyle="italic"
          fontSize="xl"
          fontFamily="Aria"
          onClick={handleItalicClick}
          isDisabled={isItalicAvailable}
        >
          I
        </Button>
      </Tooltip>
    </>
  );
};

export default FontStyle;
