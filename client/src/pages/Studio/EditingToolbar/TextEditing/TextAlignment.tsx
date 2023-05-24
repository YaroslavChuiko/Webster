import { Icon, IconButton, Tooltip } from '@chakra-ui/react';
import { HiOutlineMenu, HiOutlineMenuAlt1, HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from 'react-icons/hi';
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
    switch (textAlign) {
      case 'center':
        return HiOutlineMenuAlt1;
      case 'left':
        return HiOutlineMenuAlt2;
      case 'right':
        return HiOutlineMenuAlt3;
      case 'justify':
        return HiOutlineMenu;
      default:
        break;
    }
  };

  return (
    <Tooltip hasArrow label="Alignment" placement="bottom" openDelay={500}>
      <IconButton
        aria-label="Alignment"
        icon={<Icon as={getAlignmentIcon(textAlign)} boxSize={5} />}
        onClick={handleAlignmentClick}
      />
    </Tooltip>
  );
};

export default TextAlignment;
