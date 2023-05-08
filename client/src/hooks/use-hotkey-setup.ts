import { RefObject } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useHotkeysFunctions from './use-hotkeys-functions';
import Konva from 'konva';
import { KeyType } from '~/consts/keys';

type Props = {
  imageTransformer?: RefObject<Konva.Transformer>;
  textTransformer?: RefObject<Konva.Transformer>;
  multiTransformer?: RefObject<Konva.Transformer>;
};

const useHotkeySetup = ({ ...transformers }: Props) => {
  const { onDeleteKey } = useHotkeysFunctions(transformers);

  useHotkeys(KeyType.DELETE, () => onDeleteKey());
};

export default useHotkeySetup;
