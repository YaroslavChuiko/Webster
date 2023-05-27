import { RefObject } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useHotkeysFunctions from './use-hotkeys-functions';
import Konva from 'konva';
import { KeyType } from '~/consts/keys';
import useSaveContent from './use-save-content';

type Props = {
  imageTransformer?: RefObject<Konva.Transformer>;
  textTransformer?: RefObject<Konva.Transformer>;
  multiTransformer?: RefObject<Konva.Transformer>;
};

const useHotkeySetup = ({ ...transformers }: Props) => {
  const {
    onDeleteKey,
    onUnselectKey,
    onCopyKey,
    onPasteKey,
    onCutKey,
    onDuplicateKey,
    onZIndexUpKey,
    onZIndexDownKey,
  } = useHotkeysFunctions(transformers);
  const { saveHandler } = useSaveContent();

  useHotkeys(KeyType.DELETE, () => onDeleteKey());
  useHotkeys(KeyType.UNSELECT, () => onUnselectKey());
  useHotkeys(KeyType.COPY, () => onCopyKey());
  useHotkeys(KeyType.PASTE, () => onPasteKey());
  useHotkeys(KeyType.CUT, () => onCutKey());
  useHotkeys(KeyType.DUPLICATE, () => onDuplicateKey());
  useHotkeys(KeyType.Z_INDEX_UP, () => onZIndexUpKey());
  useHotkeys(KeyType.Z_INDEX_DOWN, () => onZIndexDownKey());
  useHotkeys(KeyType.SAVE, () => saveHandler());
};

export default useHotkeySetup;
