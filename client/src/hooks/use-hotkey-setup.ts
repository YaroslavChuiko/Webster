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
  const { onDeleteKey, onCopyKey, onPasteKey, onCutKey, onDuplicateKey, onZIndexUpKey } =
    useHotkeysFunctions(transformers);

  useHotkeys(KeyType.DELETE, () => onDeleteKey());
  useHotkeys(KeyType.COPY, () => onCopyKey());
  useHotkeys(KeyType.PASTE, () => onPasteKey());
  useHotkeys(KeyType.CUT, () => onCutKey());
  useHotkeys(KeyType.DUPLICATE, () => onDuplicateKey());
  useHotkeys(KeyType.Z_INDEX_UP, () => onZIndexUpKey());
};

export default useHotkeySetup;
