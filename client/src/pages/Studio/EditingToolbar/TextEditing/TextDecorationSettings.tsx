import { Button, Tooltip } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageTextData } from '~/types/stage-object';

type Props = {
  id: string;
  textDecoration: StageTextData['textDecoration'];
};

const TextDecorationSettings = ({ id, textDecoration }: Props) => {
  const { updateOne } = useStageObject();

  const isUnderlineActive = textDecoration.includes('underline');
  const isLineThroughActive = textDecoration.includes('line-through');

  const handleUnderlineClick = () => {
    updateOne({ id, data: { textDecoration: toggleUnderline(textDecoration) } });
  };

  const handleLineThroughClick = () => {
    updateOne({ id, data: { textDecoration: toggleLineThrough(textDecoration) } });
  };

  const toggleUnderline = (textDecoration: StageTextData['textDecoration']) => {
    switch (textDecoration) {
      case '':
        return 'underline';
      case 'underline':
        return '';
      case 'line-through':
        return 'underline line-through';
      case 'underline line-through':
        return 'line-through';
      default:
        break;
    }
  };

  const toggleLineThrough = (textDecoration: StageTextData['textDecoration']) => {
    switch (textDecoration) {
      case '':
        return 'line-through';
      case 'underline':
        return 'underline line-through';
      case 'line-through':
        return '';
      case 'underline line-through':
        return 'underline';
      default:
        break;
    }
  };

  return (
    <>
      <Tooltip hasArrow label="Underline" placement="bottom" openDelay={500}>
        <Button isActive={isUnderlineActive} textDecoration="underline" fontSize="xl" onClick={handleUnderlineClick}>
          U
        </Button>
      </Tooltip>
      <Tooltip hasArrow label="Line-through" placement="bottom" openDelay={500}>
        <Button
          isActive={isLineThroughActive}
          textDecoration="line-through"
          fontSize="xl"
          onClick={handleLineThroughClick}
        >
          S
        </Button>
      </Tooltip>
    </>
  );
};

export default TextDecorationSettings;
