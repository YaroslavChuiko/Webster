import { Button, Tooltip } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageTextData } from '~/types/stage-object';

type Props = {
  id: string;
  textAlign: StageTextData['align'];
};

const TextAlignment = ({ id, textAlign }: Props) => {
  const { updateOne } = useStageObject();

  const handleAlignmentClick = () => {
    updateOne({ id, data: { align: toggleAlignment(textAlign) } });
  };

  const toggleAlignment = (textAlign: StageTextData['align']) => {
    switch (textAlign) {
      case 'left':
        return 'center';
      case 'center':
        return 'right';
      case 'right':
        return 'justify';
      case 'justify':
        return 'left';
      default:
        break;
    }
  };

  const getAlignmentIcon = (textAlign: StageTextData['align']) => {
    //!! replace letters with icons
    switch (textAlign) {
      case 'center':
        return 'C';
      case 'left':
        return 'L';
      case 'right':
        return 'R';
      case 'justify':
        return 'J';
      default:
        break;
    }
  };

  return (
    <Tooltip hasArrow label="Alignment" placement="bottom" openDelay={500}>
      <Button fontSize="xl" onClick={handleAlignmentClick}>
        {getAlignmentIcon(textAlign)}
      </Button>
    </Tooltip>
  );
};

export default TextAlignment;
